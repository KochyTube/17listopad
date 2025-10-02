import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import RandomBg from './ui/RandomBg';

import Client from "@/client";

function AboutUs() {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      const entries = await Client.getEntries({
        content_type: 'o-nas',
        limit: 1,
      });

      if (entries.items.length > 0) {
        setArticle(entries.items[0].fields);
      }
    }

    fetchArticle();
  }, []);

  if (!article) return <p>Načítám...</p>;

  return (
    <section
      id="o-nas"
      className="section-spacing bg-musician-light relative w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <RandomBg  avoidRefs={[]}/>
      </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-musician-blue mb-6 text-center tracking-tight">
                    O nás
                </h2>
                <p className='text-musician-dark'>{article.onas}</p>
            </div>
        </div>
    </section>
  );
}

export default AboutUs;
