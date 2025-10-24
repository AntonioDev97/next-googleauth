'use client';
import React from 'react';
import AuthStatus from '../components/AuthStatus';
import { useSession } from 'next-auth/react';

const DashboardPage = () => {
    const { data: session } = useSession();
    return (
        <div className="min-h-screen p-28">
            <header className="mb-10 flex justify-between items-center">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Dashboard
                </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Tarjeta de Bienvenida Principal */}
                <div className="lg:col-span-2 p-8 bg-white rounded-xl shadow-lg border border-indigo-100">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-2">
                        ¡Bienvenido, {session?.user?.name?.split(' ')[0] ?? session?.user?.email}!
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Aquí tienes un resumen rápido de tu actividad. Esta área está completamente protegida.
                    </p>
                    {session?.user?.image && (
                        <img
                            src={session?.user?.image}
                            alt={`Foto de ${session?.user?.name}`}
                            className="w-20 h-20 rounded-full mt-4 border-4 border-white shadow-md"
                        />
                    )}
                </div>

                {/* Tarjeta de Información de la Cuenta */}
                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Detalles de la Cuenta
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium text-gray-700">Nombre:</span> {session?.user?.name}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium text-gray-700">Email:</span> {session?.user?.email}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-700">ID de Sesión:</span> {session?.expires ? 'Activa' : 'Desconocido'}
                    </p>
                </div>

                {/* Tarjeta de Métricas (Ejemplo) */}
                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Métricas Rápidas
                    </h3>
                    <div className="flex justify-between mb-3">
                        <span className="text-gray-600">Proyectos:</span>
                        <span className="font-bold text-indigo-600">4</span>
                    </div>
                    <div className="flex justify-between mb-3">
                        <span className="text-gray-600">Tareas Pendientes:</span>
                        <span className="font-bold text-red-500">2</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Último Login:</span>
                        <span className="font-bold text-green-500">Ahora</span>
                    </div>
                </div>

                {/* Tarjeta de Navegación Rápida (Ejemplo) */}
                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Navegación Rápida
                    </h3>
                    <ul className="space-y-2">
                        <li className="text-indigo-600 hover:text-indigo-800 transition duration-150 cursor-pointer">
                            Ver Configuraciones
                        </li>
                        <li className="text-indigo-600 hover:text-indigo-800 transition duration-150 cursor-pointer">
                            Reporte de Errores
                        </li>
                        <li className="text-indigo-600 hover:text-indigo-800 transition duration-150 cursor-pointer">
                            Centro de Ayuda
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;