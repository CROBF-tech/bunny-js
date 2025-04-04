
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bunny-black text-bunny-yellow-light py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-bunny-yellow font-bold text-lg mb-4">bunny</h3>
            <p className="text-sm">
              Una pequeña librería JavaScript minimalista para interactuar con el DOM de manera sencilla.
            </p>
          </div>
          <div>
            <h3 className="text-bunny-yellow font-bold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-bunny-yellow transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-sm hover:text-bunny-yellow transition-colors">
                  Documentación
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/CROBF-ARG/bunny-js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-bunny-yellow transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-bunny-yellow font-bold text-lg mb-4">Comunidad</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://twitter.com/bunny_js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-bunny-yellow transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/bunny-js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-bunny-yellow transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-bunny-yellow/20 mt-8 pt-8 text-center text-sm">
          <p>© {currentYear} bunny. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
