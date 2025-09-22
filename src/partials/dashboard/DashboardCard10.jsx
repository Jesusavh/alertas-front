import React from 'react';
import { useEffect, useState } from "react";

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

const columns = {
  visitas: [
    { key: 'id', label: 'ID' },
    { key: 'marca_temporal', label: 'Marca temporal' },
    { key: 'correo', label: 'Correo' },
    { key: 'zona', label: 'Zona' },
    { key: 'tipo_visita', label: 'Tipo Visita' },
    { key: 'nombre_medico', label: 'Nombre medico' },
    { key: 'especialidad', label: 'Especialidad' },
    { key: 'centro_salud', label: 'Centro de salud' },
    { key: 'tipo_centro', label: 'Tipo centro' },
    { key: 'alerta', label: 'Alerta' },
    { key: 'entrego_muestras', label: 'Entrego muestras' },
    { key: 'prescribe', label: 'Prescribe' },
    { key: 'entrego_articulos', label: 'Entrego articulos' },
    { key: 'informe', label: 'Informe' },
    { key: 'actions', label: 'Acciones' },
  ],
  supervisores: [
    { key: 'id', label: 'ID' },
    { key: 'marca_temporal', label: 'Marca temporal' },
    { key: 'correo', label: 'Correo' },
    { key: 'nombre_supervisor', label: 'Nombre supervisor' },
    { key: 'zona', label: 'Zona' },
    { key: 'visita_realizada', label: 'Visita realizada' },
    { key: 'evaluacion_circuito', label: 'Evaluacion circuito' },
    { key: 'nombre_visitador', label: 'Nombre visitador' },
    { key: 'nombre_centro_salud', label: 'Nombre centro salud' },
    { key: 'cumplimiento_objetivo', label: 'Cumplimiento objetivo' },
    { key: 'actions', label: 'Acciones' },
  ],
  representantes: [
    { key: 'id', label: 'ID' },
    { key: 'marca_temporal', label: 'Marca temporal' },
    { key: 'correo', label: 'Correo' },
    { key: 'nombre_cliente', label: 'Nombre cliente' },
    { key: 'clasificacion_cliente', label: 'Clasificacion cliente' },
    { key: 'zona_region', label: 'Zona region' },
    { key: 'visita_presencial', label: 'Visita presencial' },
    { key: 'motivo_visita', label: 'Motivo visita' },
    { key: 'informe_visita', label: 'Informe visita' },
    { key: 'condicion_farmacia', label: 'Condicion farmacia' },
    { key: 'pedido', label: 'Pedido' },
    { key: 'alerta_emitida', label: 'Alerta emitida' },
    { key: 'actions', label: 'Acciones' },
  ],
  alertas: [
    { key: 'id', label: 'ID' },
    { key: 'marca_temporal', label: 'Marca temporal' },
    { key: 'correo', label: 'Correo' },
    { key: 'zona', label: 'Zona' },
    { key: 'alerta', label: 'Alerta' },
    { key: 'alerta_emitida', label: 'Alerta emitida' },
    { key: 'type', label: 'Tipo' },
    { key: 'actions', label: 'Acciones' },
  ],
};

const notesFields = {
  visitas: 'anotaciones',
  supervisores: 'anotaciones_actividad',
  representantes: 'observacion',
  alertas: null,
};

function DashboardCard10({ refreshFlag, setRefreshFlag, dateRange }) {
  const [visitas, setVisitas] = useState([]);
  const [representantes, setRepresentantes] = useState([]);
  const [supervisores, setSupervisores] = useState([]);
  const [selectedType, setSelectedType] = useState('visitas');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchVisitas = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/visitas");
      const data = await res.json();
      console.log("Visitas cargadas:", data);
      setVisitas(data);
    } catch (err) {
      console.error("Error al cargar visitas:", err);
    }
  };

  const fetchRepresentantes = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/representantes");
      const data = await res.json();
      console.log("Representantes cargados:", data);
      setRepresentantes(data);
    } catch (err) {
      console.error("Error al cargar representantes:", err);
    }
  };

  const fetchSupervisores = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/supervisores");
      const data = await res.json();
      console.log("Supervisores cargados:", data);
      setSupervisores(data);
    } catch (err) {
      console.error("Error al cargar supervisores:", err);
    }
  };
  useEffect(() => {
    if (refreshFlag) {
      fetchVisitas();
      fetchRepresentantes();
      fetchSupervisores();
      setRefreshFlag(false);
    }
  }, [refreshFlag, setRefreshFlag]);

  useEffect(() => {
    fetchVisitas();
    fetchRepresentantes();
    fetchSupervisores();
  }, []);

  const getFilteredData = () => {
    let data;
    switch (selectedType) {
      case 'visitas':
        data = visitas;
        break;
      case 'representantes':
        data = representantes;
        break;
      case 'supervisores':
        data = supervisores;
        break;
      case 'alertas':
        const allData = [
          ...visitas.map(v => ({ ...v, type: 'visitas' })),
          ...representantes.map(r => ({ ...r, type: 'representantes' })),
        ];
        data = allData.filter(item => item.alerta === 'SI' || item.alerta_emitida === 'SI');
        break;
      default:
        data = visitas;
    }

    return data.filter(item => {
      // Date filter
      const itemDate = new Date(item.marca_temporal);
      const fromDate = dateRange?.from ? new Date(dateRange.from) : null;
      const toDate = dateRange?.to ? new Date(dateRange.to) : null;
      if (fromDate && itemDate < fromDate) return false;
      if (toDate && itemDate > toDate) return false;

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return Object.values(item).some(value =>
          value && value.toString().toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  };

  const currentColumns = columns[selectedType];

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            {selectedType === 'visitas' ? 'Visitas' : selectedType === 'representantes' ? 'Representantes' : selectedType === 'supervisores' ? 'Supervisores' : 'Alertas'}
          </h2>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => setSelectedType('visitas')}
            className={`px-4 py-2 rounded ${selectedType === 'visitas' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}
          >
            Visitas
          </button>
          <button
            onClick={() => setSelectedType('representantes')}
            className={`px-4 py-2 rounded ${selectedType === 'representantes' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}
          >
            Representantes
          </button>
          <button
            onClick={() => setSelectedType('supervisores')}
            className={`px-4 py-2 rounded ${selectedType === 'supervisores' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}
          >
            Supervisores
          </button>
          <button
            onClick={() => setSelectedType('alertas')}
            className={`px-4 py-2 rounded ${selectedType === 'alertas' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}
          >
            Alertas
          </button>
        </div>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="table-fixed w-full">
          <table className="table-fixed w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                {currentColumns.map(col => (
                  <th key={col.key} className="p-2 whitespace-normal">
                    <div className="font-semibold text-left">{col.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {
      getFilteredData().map(v => (
        <React.Fragment key={v.id}>
          <tr>
            {currentColumns.map(col => (
              <td key={col.key} className="p-2 whitespace-normal">
                {col.key === 'actions' ? (
                  <button
                    onClick={() => { setSelectedItem(v); setModalOpen(true); }}
                    className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    Ver más
                  </button>
                ) : (
                  <div className="text-left">{col.key === 'zona' ? (v.zona || v.zona_region) : v[col.key]}</div>
                )}
              </td>
            ))}
          </tr>
          {v[notesFields[selectedType]] && (
            <tr>
              <td colSpan={currentColumns.length} className="p-2 bg-yellow-50 dark:bg-gray-700/50">
                <div className="flex flex-nowrap gap-2">
                  <div className="text-center pt-4 italic text-gray-600 dark:text-gray-300">
                    {selectedType === 'visitas' ? 'Anotaciones:' : selectedType === 'supervisores' ? 'Anotaciones actividad:' : 'Observacion:'}
                  </div>
                  <div className="text-left italic text-gray-600 dark:text-gray-300">
                    {v[notesFields[selectedType]]}
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Detalles del Registro</h3>
              {selectedItem && (
                <div className="space-y-2">
                  {Object.entries(selectedItem).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <strong className="text-gray-700 dark:text-gray-300 capitalize">{key.replace(/_/g, ' ')}:</strong>
                      <span className="text-gray-900 dark:text-gray-100 text-right">{value || 'N/A'}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardCard10;
