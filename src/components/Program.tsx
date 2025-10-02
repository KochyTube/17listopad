import React, { useEffect, useState } from "react";
import { createClient, Entry, EntrySkeletonType } from "contentful";
import RandomBg from "./ui/RandomBg";

import Client from "@/client";

interface ProgramFields {
  DateTime?: string;
  place?: string;
  name?: string;
}

interface ProgramSkeleton extends EntrySkeletonType {
  contentTypeId: "progam";
  fields: ProgramFields;
}

const dayNames: Record<string, string> = {
  po: "Pondělí",
  ut: "Úterý",
  st: "Středa",
  ct: "Čtvrtek",
  pa: "Pátek",
  so: "Sobota",
  ne: "Neděle",
};

const Program = () => {
  const [progs, setProgs] = useState<Entry<ProgramSkeleton, undefined, string>[]>([]);
  const [loading, setLoading] = useState(true);

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

  const grouped = progs.reduce<Record<string, Record<string, Entry<ProgramSkeleton, undefined, string>[]>>>(
    (acc, entry) => {
      const dateTime = entry.fields.DateTime;
      if (!dateTime) return acc;
      
      const day = getDayShort(dateTime);
      const place = entry.fields.place || "Neznámé místo";
      if (!acc[day]) acc[day] = {};
      if (!acc[day][place]) acc[day][place] = [];
      acc[day][place].push(entry);
      return acc;
    },
    {}
  );

  const daysOrder = ["ct", "pa", "so", "ne"];

  if (loading) return <p>Načítám program...</p>;

  return (
    <section id="program" className="section-spacing bg-musician-blue relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <RandomBg avoidRefs={[]} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight">Program</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {daysOrder.map((day) => (
              <div key={day} className="rounded-2xl overflow-hidden bg-musician-light text-musician-dark p-4">
                <h3 className="mt-4 text-center text-xl font-bold text-musician-dark">{dayNames[day]}</h3>

                {grouped[day] ? (
                  Object.keys(grouped[day]).map((place) => (
                    <div key={place} className="mt-4">
                      <p className="text-center text-sm text-gray-600 mb-2">{place}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {grouped[day][place]
                          .sort((a, b) => {
                            const aDate: string = a.fields.DateTime || "";
                            const bDate: string = b.fields.DateTime || "";
                            return aDate.localeCompare(bDate);
                          })
                          .map((prog) => {
                            const dateTime = prog.fields.DateTime;
                            if (!dateTime) return null;
                            
                            const time = new Date(dateTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            });
                            return (
                              <div key={prog.sys.id} className="flex flex-row gap-2 items-center">
                                <p className="font-semibold">{time}</p>
                                <p>{prog.fields.name}</p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-500 mt-4">Žádný program</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;