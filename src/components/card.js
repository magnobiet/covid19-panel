import React from 'react';

const Card = ({ data }) => {

  return (

    <>

      <div className="flex flex-row sm:flex-col md:flex-row space-x-6">

        <div className="flex flex-col text-center w-48 inline-block bg-gray-600 rounded px-3 py-8 text-white shadow">
          <span className="font-bold text-2xl">{data.Confirmed}</span>
          <span className="text-xs uppercase">Confirmados</span>
        </div>

        <div className="flex flex-col text-center w-48 inline-block bg-blue-600 rounded px-3 py-8 text-white shadow">
          <span className="font-bold text-2xl">{data.Active}</span>
          <span className="text-xs uppercase">Ativos</span>
        </div>

        <div className="flex flex-col text-center w-48 inline-block bg-green-600 rounded px-3 py-8 text-white shadow">
          <span className="font-bold text-2xl">{data.Recovered}</span>
          <span className="text-xs uppercase">Recuperados</span>
        </div>

        <div className="flex flex-col text-center w-48 inline-block bg-red-600 rounded px-3 py-8 text-white shadow">
          <span className="font-bold text-2xl">{data.Deaths}</span>
          <span className="text-xs uppercase">Mortes</span>
        </div>

      </div>

      <p className="text-gray-700 text-xs text-center">
        Atualizado em {data.Date} com dados fornecidos por <a href="https://covid19api.com/" className="underline" target="_blank" rel="noopener noreferrer">covid19api.com</a>.
      </p>

    </>

  );

};

export default Card;
