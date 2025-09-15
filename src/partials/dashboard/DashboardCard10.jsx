import React from 'react';
import { useEffect, useState } from "react";

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

function DashboardCard10({ refreshFlag, setRefreshFlag }) {
  const [visitas, setVisitas] = useState([]);

  const fetchVisitas = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/visitas");
      const data = await res.json();
      setVisitas(data);
    } catch (err) {
      console.error("Error al cargar visitas:", err);
    }
  };
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
    if (refreshFlag) {
      fetchVisitas();
      setRefreshFlag(false);
    }
  }, [refreshFlag, setRefreshFlag]);

  useEffect(() => {
    fetchVisitas();
  }, []);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Customers</h2>
      </header>      
      <div className="p-3">

        {/* Table */}
        <div className="table-fixed w-full">
          <table className="table-fixed w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-left">ID</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-left">Marca temporal</div>
                </th>
                <th className="p-2 w-58 whitespace-normal">
                  <div className="font-semibold text-left">Correo</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-center">Zona</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-center">Tipo Visita</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-center">Nombre medico</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-center">Especialidad</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-center">centro de salud</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-center">Tipo centro</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-center">Alerta</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-center">Entrego muestras</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-center">Anotaciones</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-center">prescribe</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-center">Entrego articulos</div>
                </th>
                <th className="p-2 whitespace-normal">
                  <div className="font-semibold text-center">informe</div>
                </th>

              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {
      visitas.map(v => (
        <React.Fragment key={v.id}>
          <tr>
            <td className="p-2 whitespace-normal">
              {/* <div className="flex items-center">
                <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                  <img className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
                </div>
                <div className="font-medium text-gray-800 dark:text-gray-100">{customer.name}</div>
              </div> */}
               <div className="text-left">{v.id}</div>
            </td>
            <td className="p-2 whitespace-normal">
              <div className="text-left">{v.marca_temporal}</div>
            </td>
            <td className="p-2 whitespace-normal">
              <div className="text-left">{v.correo}</div>
            </td>
            <td className="p-2 whitespace-normal">
              <div className="text-left font-medium text-green-500">{v.zona}</div>
            </td>
            <td className="p-2 whitespace-normal">
              <div className="text-lg text-center">{v.tipo_visita}</div>
            </td>
            <td className="p-2 whitespace-normal">
              <div className="text-lg text-center">{v.nombre_medico}</div>
            </td>
            <td className="p-2 whitespace-normal">
              <div className="text-lg text-center">{v.especialidad}</div>
            </td>
            <td className="p-2 whitespace-normal">
              <div className="text-lg text-center">{v.centro_salud}</div>
            </td>
            <td className="p-2 whitespace-normal">
              <div className="text-lg text-center">{v.tipo_centro}</div>
            </td>
            <td className="p-2 whitespace-normal">
              <div className="text-lg text-center">{v.alerta}</div>
            </td>
            <td className="p-2 whitespace-normal">
              <div className="text-lg text-center">{v.entrego_muestras}</div>
            </td>
            {/* <td className="p-2 whitespace-normal">
              <div className="text-lg text-center">{v.anotaciones}</div>
            </td> */}
            <td className="p-2 whitespace-normal">
              <div className="text-lg text-center">{v.prescribe}</div>
            </td>
            <td className="p-2 whitespace-normal">
              <div className="text-lg text-center">{v.entrego_articulos}</div>
            </td>
            <td className="p-2 whitespace-normal">
              <div className="text-lg text-center">{v.informe}</div>
            </td>
          </tr>
          {v.anotaciones && (
            <tr>
              {/* Se usa colspan para que la celda ocupe todas las columnas */}
              <td colSpan="15" className="p-2 bg-yellow-50 dark:bg-gray-700/50">
                <div className="flex flex-nowrap gap-2">
                    <div className="text-center pt-4 italic text-gray-600 dark:text-gray-300">
                    Anotaciones: 
                  </div>
                  <div className="text-left italic text-gray-600 dark:text-gray-300">
                    {v.anotaciones}
                  </div>

                </div>
                
              </td>
            </tr>
          )}
        </React.Fragment>
      ))
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
