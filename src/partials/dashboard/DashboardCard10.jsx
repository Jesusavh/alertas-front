import React from 'react';
import { useEffect, useState } from "react";

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

function DashboardCard10() {
  const [visitas, setVisitas] = useState([]);
  // const customers = [

  //   {
  //     id: '0',
  //     image: Image01,
  //     name: 'Alex Shatov',
  //     email: 'alexshatov@gmail.com',
  //     location: '🇺🇸',
  //     spent: '$2,890.66',
  //   },
  //   {
  //     id: '1',
  //     image: Image02,
  //     name: 'Philip Harbach',
  //     email: 'philip.h@gmail.com',
  //     location: '🇩🇪',
  //     spent: '$2,767.04',
  //   },
  //   {
  //     id: '2',
  //     image: Image03,
  //     name: 'Mirko Fisuk',
  //     email: 'mirkofisuk@gmail.com',
  //     location: '🇫🇷',
  //     spent: '$2,996.00',
  //   },
  //   {
  //     id: '3',
  //     image: Image04,
  //     name: 'Olga Semklo',
  //     email: 'olga.s@cool.design',
  //     location: '🇮🇹',
  //     spent: '$1,220.66',
  //   },
  //   {
  //     id: '4',
  //     image: Image05,
  //     name: 'Burak Long',
  //     email: 'longburak@gmail.com',
  //     location: '🇬🇧',
  //     spent: '$1,890.66',
  //   },
  // ];
  useEffect(() => {
    // Llamada al backend para obtener datos
    fetch("http://localhost:3001/api/visitas")
      .then((res) => res.json())
      .then((data) => setVisitas(data))
      .catch((err) => console.error("Error al cargar visitas:", err));
  }, []);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Customers</h2>
      </header>      
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">ID</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Marca temporal</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Correo</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Zona</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Tipo Visita</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Nombre medico</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Especialidad</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">centro de salud</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Tipo centro</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Alerta</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Entrego muestras</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Anotaciones</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">prescribe</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Entrego articulos</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">informe</div>
                </th>

              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {
                visitas.map(v => {
                  return (
                    <tr key={v.id}>
                      <td className="p-2 whitespace-nowrap">
                        {/* <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
                          </div>
                          <div className="font-medium text-gray-800 dark:text-gray-100">{customer.name}</div>
                        </div> */}
                         <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{v.marca_temporal}</div>
                      </td>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{v.correo}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{v.zona}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{v.tipo_visita}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{v.nombre_medico}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{v.especialidad}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{v.centro_salud}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{v.tipo_centro}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{v.alerta}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{v.entrego_muestras}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{v.anotaciones}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{v.prescribe}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{v.entrego_articulos}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{v.informe}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
