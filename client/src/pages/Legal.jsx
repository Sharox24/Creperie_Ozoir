import React from 'react';
import { Helmet } from 'react-helmet';

const Legal = () => (
  <>
    <Helmet>
      <title>Mentions légales - Crêperie Ozoir</title>
      <meta name="description" content="Mentions légales de la Crêperie Ozoir." />
    </Helmet>
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-playfair font-bold text-anthracite mb-6">Mentions légales</h1>
      <div className="prose prose-neutral max-w-none">
        <p>Crêperie Ozoir — 123 Avenue de la République, 77330 Ozoir-la-Ferrière</p>
        <p>SIRET: 000 000 000 00000 — Email: contact@creperieozoir.fr</p>
        <p>Directeur de la publication: Crêperie Ozoir</p>
        <p>Hébergement: votre hébergeur</p>
      </div>
    </div>
  </>
);

export default Legal;
