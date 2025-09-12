{{-- resources/views/filament/custom-icons.blade.php --}}

{{-- Aucun contenu nécessaire, ce fichier sert juste de hook --}}

<script>
// 🎯 Correction JavaScript pour remplacer les codes @svg par des icônes
document.addEventListener('DOMContentLoaded', function() {
    // Remplacer tous les éléments contenant @svg par des icônes simples
    const svgElements = document.querySelectorAll('*');
    svgElements.forEach(element => {
        if (element.textContent && element.textContent.includes('@svg(')) {
            // Remplacer par une icône simple
            if (element.textContent.includes('home') || element.textContent.includes('dashboard')) {
                element.innerHTML = '🏠';
            } else if (element.textContent.includes('user') || element.textContent.includes('account')) {
                element.innerHTML = '👤';
            } else if (element.textContent.includes('settings') || element.textContent.includes('gear')) {
                element.innerHTML = '⚙️';
            } else if (element.textContent.includes('logout') || element.textContent.includes('sign-out')) {
                element.innerHTML = '🚪';
            } else {
                element.innerHTML = '📄';
            }
            element.style.fontSize = '1.2em';
            element.style.display = 'inline-block';
        }
    });
});
</script>

<style>
/* 🎯 Masquer le texte @svg non interprété */
[class*="svg"] {
    font-size: 0 !important;
}

[class*="svg"]:before {
    content: "📄";
    font-size: 1.2em;
    display: inline-block;
}
</style>
