import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <p className="mb-4 text-sm font-medium tracking-widest text-nodo-gray-600 uppercase">
        404
      </p>
      <h1 className="mb-3 text-4xl font-medium tracking-[-0.02em] text-nodo-white sm:text-5xl">
        Página no encontrada
      </h1>
      <p className="mb-10 max-w-sm text-center text-[15px] text-nodo-gray-400">
        La página que buscás no existe o fue movida.
      </p>
      <Link
        href="/"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-[3px] px-7 py-3 text-[13px] font-medium tracking-wide text-nodo-white transition-all duration-300 hover:shadow-[0_0_28px_rgba(39,133,254,0.2)]"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-nodo-purple via-nodo-indigo via-60% to-nodo-blue transition-opacity duration-300 group-hover:opacity-90" />
        <span className="absolute inset-x-0 top-0 h-px bg-white/[0.12]" />
        <span className="relative">Volver al inicio</span>
      </Link>
    </section>
  );
}
