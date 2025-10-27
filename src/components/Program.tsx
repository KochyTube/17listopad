import React, { useEffect, useState } from "react";
import { Entry, EntrySkeletonType } from "contentful";
import RandomBg from "./ui/RandomBg";
import Client from "@/client";
import { Clock, MapPin, Coins } from "lucide-react";

interface ProgramFields {
  DateTime?: string;
  place?: string;
  name?: string;
  popis?: string;
  prize?: number;
}

interface ProgramSkeleton extends EntrySkeletonType {
  contentTypeId: "progam";
  fields: ProgramFields;
}

const Program = () => {
  const [progs, setProgs] = useState<Entry<ProgramSkeleton, undefined, string>[]>([]);
  const [loading, setLoading] = useState(true);

  const dayNames: Record<string, string> = {
    ct: "Čtvrtek",
    pa: "Pátek",
    so: "Sobota",
    ne: "Neděle",
  };

  const daysOrder = ["ct", "pa", "so", "ne"];

  useEffect(() => {
    async function fetchProgs() {
      try {
        const response = await Client.getEntries<ProgramSkeleton>({
          content_type: "progam",
          order: ["fields.DateTime"] as any,
          limit: 100,
        });
        setProgs(response.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProgs();
  }, []);

  const getDayShort = (dateStr: string): string => {
    const date = new Date(dateStr);
    const daysShort = ["ne", "po", "ut", "st", "ct", "pa", "so"];
    return daysShort[date.getDay()];
  };

  // Seskupení programů podle dne
  const groupedPrograms: Record<string, Entry<ProgramSkeleton, undefined, string>[]> = {};
  progs.forEach((prog) => {
    const dateTime = prog.fields.DateTime;
    if (!dateTime) return;
    const day = getDayShort(dateTime);
    if (!groupedPrograms[day]) groupedPrograms[day] = [];
    groupedPrograms[day].push(prog);
  });

  if (loading) return <p>Načítám program...</p>;

  return (
    <section id="program" className="section-spacing bg-musician-blue relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <RandomBg avoidRefs={[]} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight text-white">
            Program
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {daysOrder.map((day) => {
              const dayProgs = groupedPrograms[day] || [];

              return (
                <div
                  key={day}
                  className="rounded-3xl overflow-visible bg-white/90 dark:bg-gray-900/80 shadow-lg p-6 transition-transform transform hover:scale-105"
                >
                  <h3 className="text-center text-2xl font-bold text-musician-dark mb-4">
                    {dayNames[day]}
                  </h3>

                  {dayProgs.length > 0 ? (
                    <div className="flex flex-col gap-6">
                      {dayProgs.map((prog, index) => (
                        <div key={index} className="border-b border-gray-300 pb-4 last:border-none">
                          {/* Čas */}
                          {prog.fields.DateTime && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <Clock className="w-5 h-5 text-musician-blue" />
                              <span>
                                {new Date(prog.fields.DateTime).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          )}

                          {/* Místo */}
                          {prog.fields.place && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <MapPin className="w-5 h-5 text-musician-blue" />
                              <span>{prog.fields.place}</span>
                            </div>
                          )}

                          {/* Cena */}
                          {prog.fields.prize !== undefined && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <Coins className="w-5 h-5 text-musician-blue" />
                              <span>{prog.fields.prize} Kč</span>
                            </div>
                          )}

                          {/* Název a popis */}
                          <div className="mt-3 flex flex-col gap-2 text-musician-dark">
                            <span className="block text-lg font-semibold">
                              {prog.fields.name}
                            </span>

                            {prog.fields.popis && (
                              <p className="text-sm text-gray-600 leading-snug whitespace-pre-line">
                                {prog.fields.popis}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 mt-4">Žádný program</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;
