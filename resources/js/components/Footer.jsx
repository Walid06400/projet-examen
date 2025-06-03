import React from "react";
import { Link } from "@inertiajs/react";

export default function Footer() {
  return (
    <footer className="w-full bg-w border-t border-white shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Réseaux sociaux */}
        <div className="flex space-x-4 mb-2 md:mb-0">
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            {/* Facebook SVG */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.16 8.44 9.93v-7.03H7.9v-2.9h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34v7.03C18.34 21.23 22 17.09 22 12.07z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            {/* Twitter SVG */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 5.94c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.89-2.38 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.36 0-4.28 1.92-4.28 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.2 1.64 4.16c-.37.64-.58 1.39-.58 2.18 0 1.5.76 2.82 1.92 3.6-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.37.1-.76.16-1.16.16-.28 0-.55-.03-.82-.08.56 1.74 2.17 3.01 4.09 3.05A8.63 8.63 0 0 1 2 19.54c-.38 0-.76-.02-1.13-.07A12.18 12.18 0 0 0 7.29 21.5c7.55 0 11.69-6.26 11.69-11.69 0-.18-.01-.36-.02-.54.8-.57 1.5-1.29 2.05-2.11z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            {/* Instagram SVG */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.056 1.96.24 2.41.41a4.92 4.92 0 0 1 1.74 1.14 4.92 4.92 0 0 1 1.14 1.74c.17.45.354 1.24.41 2.41.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.96-.41 2.41a4.92 4.92 0 0 1-1.14 1.74 4.92 4.92 0 0 1-1.74 1.14c-.45.17-1.24.354-2.41.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.96-.24-2.41-.41a4.92 4.92 0 0 1-1.74-1.14 4.92 4.92 0 0 1-1.14-1.74c-.17-.45-.354-1.24-.41-2.41C2.172 15.584 2.16 15.2 2.16 12s.012-3.584.07-4.85c.056-1.17.24-1.96.41-2.41A4.92 4.92 0 0 1 3.78 3a4.92 4.92 0 0 1 1.74-1.14c.45-.17 1.24-.354 2.41-.41C8.416 2.172 8.8 2.16 12 2.16zm0-2.16C8.736 0 8.332.013 7.052.072c-1.28.06-2.16.25-2.91.53a6.92 6.92 0 0 0-2.51 1.64A6.92 6.92 0 0 0 .6 4.142c-.28.75-.47 1.63-.53 2.91C.013 8.332 0 8.736 0 12c0 3.264.013 3.668.072 4.948.06 1.28.25 2.16.53 2.91a6.92 6.92 0 0 0 1.64 2.51 6.92 6.92 0 0 0 2.51 1.64c.75.28 1.63.47 2.91.53C8.332 23.987 8.736 24 12 24s3.668-.013 4.948-.072c1.28-.06 2.16-.25 2.91-.53a6.92 6.92 0 0 0 2.51-1.64 6.92 6.92 0 0 0 1.64-2.51c.28-.75.47-1.63.53-2.91.059-1.28.072-1.684.072-4.948s-.013-3.668-.072-4.948c-.06-1.28-.25-2.16-.53-2.91a6.92 6.92 0 0 0-1.64-2.51A6.92 6.92 0 0 0 19.858.6c-.75-.28-1.63-.47-2.91-.53C15.668.013 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-10.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            {/* LinkedIn SVG */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76c.97 0 1.75.79 1.75 1.76s-.78 1.76-1.75 1.76zm15.25 12.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-11h2.89v1.51h.04c.4-.75 1.36-1.54 2.8-1.54 3 0 3.56 1.97 3.56 4.53v6.5z"/>
            </svg>
          </a>
          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            {/* YouTube SVG */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a2.993 2.993 0 0 0-2.107-2.12C19.308 3.5 12 3.5 12 3.5s-7.308 0-9.391.566a2.993 2.993 0 0 0-2.107 2.12C0 8.27 0 12 0 12s0 3.73.502 5.814a2.993 2.993 0 0 0 2.107 2.12C4.692 20.5 12 20.5 12 20.5s7.308 0 9.391-.566a2.993 2.993 0 0 0 2.107-2.12C24 15.73 24 12 24 12s0-3.73-.502-5.814zM9.545 15.568V8.432l6.545 3.568-6.545 3.568z"/>
            </svg>
          </a>
        </div>
        {/* Liens légaux */}
        <div className="flex space-x-4 text-sm">
          <Link href="/cgu" className="text-gray-700 hover:text-indigo-600 transition">CGU</Link>
          <span className="text-gray-300">|</span>
          <Link href="/legal" className="text-gray-700 hover:text-indigo-600 transition">Mentions légales</Link>
          <span className="text-gray-300">|</span>
          <Link href="/privacy" className="text-gray-700 hover:text-indigo-600 transition">Confidentialité</Link>
        </div>
        {/* Copyright */}
        <div className="text-gray-400 text-xs text-center md:text-right">
          &copy; {new Date().getFullYear()} Blog-MAOlogie. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
