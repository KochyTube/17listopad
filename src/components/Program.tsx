import RandomBg from "./ui/RandomBg";

const progs = [
  { day: "ct", time: "12:00", name: "Test", place: "Mír" },
  { day: "ct", time: "20:00", name: "Test2", place: "Portál" },
  { day: "pa", time: "18:00", name: "Kapela A", place: "Mír" },
  { day: "so", time: "16:00", name: "Kapela B", place: "Mír" },
  { day: "ne", time: "14:00", name: "Kapela C", place: "Portál" },
  { day: "so", time: "18:00", name: "Kapela D", place: "Hub123" },
];

const dayNames = {
  po: "Pondělí",
  ut: "Úterý",
  st: "Středa",
  ct: "Čtvrtek",
  pa: "Pátek",
  so: "Sobota",
  ne: "Neděle",
};

const Program = () => {
  const sorted = [...progs].sort((a, b) => a.time.localeCompare(b.time));

  const grouped = sorted.reduce((acc, prog) => {
    if (!acc[prog.day]) acc[prog.day] = {};
    if (!acc[prog.day][prog.place]) acc[prog.day][prog.place] = [];
    acc[prog.day][prog.place].push(prog);
    return acc;
  }, {});

  const daysOrder = ["ct", "pa", "so", "ne"];

  return (
    <section
      id="program"
      className="section-spacing bg-musician-blue relative w-full overflow-hidden"
    >
      {/* Random SVG pozadí */}
      <div className="absolute inset-0 z-0">
        <RandomBg  avoidRefs={[]}/>
      </div>

      {/* Obsah nad pozadím */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight">
            Program
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {daysOrder.map((day) => (
              <div
                key={day}
                className="rounded-2xl overflow-hidden bg-musician-light text-musician-dark p-4"
              >
                <h3 className="mt-4 text-center text-xl font-bold text-musician-dark">
                  {dayNames[day]}
                </h3>

                {grouped[day] ? (
                  Object.keys(grouped[day]).map((place) => (
                    <div key={place} className="mt-4">
                      <p className="text-center text-sm text-gray-600 mb-2">
                        {place}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {grouped[day][place].map((prog, index) => (
                          <div
                            key={index}
                            className="flex flex-row gap-2 items-center"
                          >
                            <p className="font-semibold">{prog.time}</p>
                            <p>{prog.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Žádný program
                  </p>
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
