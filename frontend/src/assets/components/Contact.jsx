import { useContactForm } from "../../hooks/useContactForm";

export default function ContactPage() {
  const { handleSubmit, isLoading } = useContactForm();

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-12 lg:py-20 w-full">
      {/* Título principal */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl lg:text-6xl font-black mb-4 tracking-tighter text-dark">
          ¡Ponte en <span className="text-primary">Contacto!</span>
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          ¿Tienes dudas, sugerencias o quieres colaborar? ¡Escríbenos y te
          responderemos lo antes posible!
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Formulario */}
        <div className="lg:col-span-3  bg-white p-8 rounded-2xl shadow-xl shadow-primary/10 border-2 border-primary/50">
          <form
            className="space-y-7"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <label htmlFor="name" className="flex flex-col gap-2">
                <span className="text-sm font-bold ml-2 text-dark">Nombre</span>
                <input
                  required
                  id="name"
                  name="name"
                  className="w-full rounded-full border border-gray-200 bg-gray-50 p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-gray-400"
                  placeholder="Tu nombre completo"
                  type="text"
                  aria-label="Nombre"
                />
              </label>
              <label htmlFor="email" className="flex flex-col gap-2">
                <span className="text-sm font-bold ml-2 text-dark">Correo</span>
                <input
                  required
                  id="email"
                  name="email"
                  className="w-full rounded-full border border-gray-200 bg-gray-50 p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-gray-400"
                  placeholder="correo@ejemplo.com"
                  type="email"
                  aria-label="Correo electrónico"
                />
              </label>
            </div>
            <label htmlFor="title" className="flex flex-col gap-2">
              <span className="text-sm font-bold ml-2 text-dark">Asunto</span>
              <input
                id="title"
                name="title"
                type="text"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-gray-400"
                placeholder="Escribe un título descriptivo de tu mensaje"
                aria-label="Asunto"
              />
            </label>
            <label htmlFor="message" className="flex flex-col gap-2">
              <span className="text-sm font-bold ml-2 text-dark">Mensaje</span>
              <textarea
                id="message"
                name="message"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none placeholder:text-gray-400 min-h-30 resize-y"
                placeholder="Cuéntanos en detalle cómo podemos ayudarte"
                rows={5}
                aria-label="Mensaje"
              ></textarea>
            </label>
            <button
              className="w-full cursor-pointer bg-primary text-white py-4 rounded-full font-extrabold text-lg shadow-lg shadow-primary/20 hover:scale-[1.03] transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Contacto rápido y ubicación */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-accent-pink/30 p-8 rounded-2xl border-2 border-dashed border-accent-pink relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2 text-primary">
                ¡Contactanos o visitanos en alguna de nuestras redes!
              </h3>
              <div className="space-y-6">
                <a
                  className="flex items-center gap-4 group"
                  href="https://wa.me/c/584122154987"
                  aria-label="WhatsApp"
                >
                  <div className="size-12 rounded-full bg-green-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                    {/* WhatsApp SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="size-6 bi bi-whatsapp"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      WhatsApp
                    </p>
                    <p className="font-bold text-lg">+58 (424) 172-8767</p>
                  </div>
                </a>
                <a
                  className="flex items-center gap-4 group"
                  href="https://www.instagram.com/onlygirlsccs?igshid=OGQ2MjdiOTE%3D"
                  aria-label="Instagram"
                >
                  <div className="size-12 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                    {/* Instagram SVG */}
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Instagram
                    </p>
                    <p className="font-bold text-lg">@OnlyGirlsCcs</p>
                  </div>
                </a>
                <a
                  className="flex items-center gap-4 group"
                  href="https://www.tiktok.com/@onlygirlccs"
                  aria-label="Tiktok"
                >
                  <div class="flex items-center justify-center p-3 bg-gray-900 rounded-full group-hover:scale-110 transition-transform">
                    <svg
                      class="size-6 fill-current text-white drop-shadow-[2px_0_0_rgba(255,0,80,1)] filter shadow-[ -2px_0_0_rgba(0,242,234,1)]"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.525.02c1.31-.032 2.612.011 3.911-.024.031 1.745.567 3.438 1.554 4.877.931 1.341 2.23 2.42 3.715 3.103V12c-1.637-.021-3.23-.497-4.597-1.378-.621-.402-1.17-.894-1.632-1.464V17.03a6.974 6.974 0 0 1-1.22 3.844c-1.218 1.706-3.155 2.793-5.228 2.92-2.188.134-4.383-.75-5.748-2.483A7.221 7.221 0 0 1 1.107 15.6c.118-2.31 1.48-4.48 3.52-5.59a6.932 6.932 0 0 1 3.42-.87c.018 1.35-.04 2.704-.002 4.053-.284-.04-.572-.053-.857-.035-1.077.067-2.106.634-2.73 1.516a3.228 3.228 0 0 0-.497 2.502c.245 1.18 1.112 2.188 2.25 2.593.992.353 2.13.23 3.033-.317a3.195 3.195 0 0 0 1.564-2.416c.074-1.127.027-2.258.04-3.387V0h.682z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Tiktok
                    </p>
                    <p className="font-bold text-lg">@onlygirlccs</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 size-32 bg-accent-yellow/20 rounded-full blur-2xl"></div>
          </div>
          {/* <div className="rounded-2xl overflow-hidden shadow-lg h-48 relative">
            <img
              className="w-full h-full object-cover"
              alt="Mapa abstracto de Caracas"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZUYgcqMmc8UITF3ECmSnERA7arYFLRWUgAmlJSzeBH7wOrob7MduMhPmWlGhYX-3YKnP6X35MmFp4kZpeTkES56Fnw8xr2kAXzU9GOFQyK-PbS_mxfSL8BUCp7n5MgUOQdcsbjseXFNS27BWN0RXVMDRqwAUENctD9hXI6trh_HG2Art_I7FRNClMPD42lquYs4ydBYe2b_AeaPAT2ZzXhvz68gzaKhDdR6L8pN5JDvXAL2cNUaVEELrE_9DVyEFnQi6m5GLTqjNy"
            />
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[2px]">
              <div className="bg-white/90 px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
                <span className="material-symbols-outlined text-primary text-sm">
                  location_on
                </span>
                <span
                  className="text-xs font-extrabold uppercase"
                  data-location="Caracas"
                >
                  Basados en Caracas, VE
                </span>
              </div>
            </div>
          </div> */}
          {/* <div className="flex justify-center gap-4">
            <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full text-sm font-bold hover:bg-primary/10 hover:text-primary transition-colors">
              Ver Preguntas Frecuentes
            </button>
          </div> */}
        </div>
      </div>
    </main>
  );
}
