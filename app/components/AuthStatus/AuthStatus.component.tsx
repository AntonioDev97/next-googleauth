"use client";
import { useSession, signIn, signOut } from "next-auth/react";

interface Props {
  isNavbar?: boolean;
};

export default function AuthStatus({ isNavbar = false }: Props) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    if (isNavbar) return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>;
    return <div className="text-gray-500">Cargando estado...</div>;
  }

  if (session) {
    // Estado autenticado: Compacto para Navbar o completo para la página
    if (isNavbar) {
      return (
        <div className="flex items-center space-x-2">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="Avatar"
              className="w-8 h-8 rounded-full cursor-pointer transition hover:ring-2 ring-indigo-500"
              onClick={() => signOut({ callbackUrl: '/' })}
              title={`Cerrar sesión de ${session.user.name}`}
            />
          )}
        </div>
      );
    }
    
    // Vista completa (para el centro de la página)
    return (
      <div className="flex items-center space-x-4 p-4 bg-green-100 rounded-xl shadow-lg">
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="Avatar del usuario"
            className="w-12 h-12 rounded-full"
          />
        )}
        <div>
          <p className="font-semibold text-xl text-green-800">
            ¡Hola, {session.user?.name ?? "Usuario"}!
          </p>
          <p className="text-sm text-green-700">{session.user?.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition transform hover:scale-105 shadow-md"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  // Estado no autenticado: Compacto para Navbar o completo para la página
  if (isNavbar) {
    return (
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 text-sm bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition shadow-lg"
      >
        Iniciar Sesión
      </button>
    );
  }

  // Vista completa (para el centro de la página)
  return (
    <div className="p-6 bg-blue-100 rounded-xl shadow-lg">
      <p className="text-blue-800 mb-4 text-lg">No has iniciado sesión.</p>
      <button
        onClick={() => signIn("google")}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
      >
        Iniciar Sesión con Google
      </button>
    </div>
  );
}
