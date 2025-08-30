import React from 'react';
import { Helmet } from 'react-helmet';
import RecruitmentHeader from '@/components/recruitment/RecruitmentHeader';
import WhyJoinUs from '@/components/recruitment/WhyJoinUs';
import JobOffers from '@/components/recruitment/JobOffers';
import ApplicationForm from '@/components/recruitment/ApplicationForm';
import RecruitmentContact from '@/components/recruitment/RecruitmentContact';

const Recruitment = () => {
  return (
    <>
      <Helmet>
        <title>Recrutement - Crêperie Ozoir | Offres d'Emploi et Candidatures</title>
        <meta name="description" content="Rejoignez l'équipe de la Crêperie Ozoir ! Découvrez nos offres d'emploi : cuisinier, serveur, commis. Postulez en ligne et intégrez une équipe passionnée." />
      </Helmet>

      <div className="min-h-screen bg-gradient-warm">
        <RecruitmentHeader />
        <WhyJoinUs />
        <JobOffers />
        <ApplicationForm />
        <RecruitmentContact />
      </div>
    </>
  );
};

export default Recruitment;