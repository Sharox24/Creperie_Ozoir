import React from 'react';
import { Helmet } from 'react-helmet';

const Privacy = () => (
  <>
    <Helmet>
      <title>Politique de confidentialité - Crêperie Ozoir</title>
      <meta name="description" content="Politique de confidentialité de la Crêperie Ozoir." />
    </Helmet>
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-playfair font-bold text-anthracite mb-6">Politique de confidentialité</h1>
      <div className="prose prose-neutral max-w-none">
        <p>Nous respectons votre vie privée. Les données collectées via les formulaires sont utilisées uniquement pour traiter vos demandes et réservations. Vous pouvez demander l'export ou la suppression de vos données en nous écrivant à contact@creperieozoir.fr.</p>
      </div>
    </div>
  </>
);

export default Privacy;
