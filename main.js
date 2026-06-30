document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const headerContainer = document.querySelector(".header-container");
    const navLinks = document.querySelectorAll(".main-nav a");

    if (menuToggle && headerContainer) {
        // Al dar clic en la hamburguesa, alternamos el estado abierto/cerrado
        menuToggle.addEventListener("click", () => {
            headerContainer.classList.toggle("nav-abierto");
        });

        // Al dar clic en cualquier enlace del menú, se cierra solo automáticamente
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                headerContainer.classList.remove("nav-abierto");
            });
        });
    }
});


// ANIMACIONES DEL HERO

document.addEventListener('DOMContentLoaded', function () {

    // Agregamos las clases iniciales (elementos invisibles antes de animar)
    const heroTag      = document.querySelector('.hero-tag');
    const heroH1       = document.querySelector('.hero-left h1');
    const heroP        = document.querySelector('.hero-left p');
    const heroBotones  = document.querySelector('.hero-actions');
    const heroStats    = document.querySelector('.hero-stats-bar');
    const heroLogo     = document.querySelector('.hero-logo-img');

    // Estado inicial: todo oculto
    [heroTag, heroH1, heroP, heroBotones].forEach(el => {
        if (el) el.classList.add('anim-texto-inicio');
    });

    if (heroStats) heroStats.classList.add('anim-stats-inicio');
    if (heroLogo)  heroLogo.classList.add('anim-logo-inicio');

    // Disparamos las animaciones con un pequeño retraso entre cada elemento
    setTimeout(() => { if (heroTag)     heroTag.classList.add('anim-visible'); },     200);
    setTimeout(() => { if (heroH1)      heroH1.classList.add('anim-visible'); },      500);
    setTimeout(() => { if (heroP)       heroP.classList.add('anim-visible'); },       800);
    setTimeout(() => { if (heroBotones) heroBotones.classList.add('anim-visible'); }, 1100);
    setTimeout(() => { if (heroStats)   heroStats.classList.add('anim-visible'); },   1400);

    // El logo entra desde la derecha un poco después
    setTimeout(() => { if (heroLogo)    heroLogo.classList.add('anim-logo-visible'); }, 700);

});

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".process-item");

    const opciones = {
        root: null,          // Usa el viewport del navegador
        rootMargin: "0px",   // Sin márgenes extra
        threshold: 0.15      // El elemento se activa cuando el 15% de él ya es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento entra en pantalla
            if (entry.isIntersecting) {
                entry.target.classList.add("show-scroll");
                // Dejamos de observarlo para que la animación solo ocurra una vez
                observer.unobserve(entry.target);
            }
        });
    }, opciones);

    // Mandar a observar cada una de las tarjetas
    items.forEach(item => {
        observer.observe(item);
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('competencias-carousel');
    const progressBar = document.getElementById('carousel-progress-bar');

    if (!carousel) return;

    let isDragging = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        carousel.classList.add('dragging');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('scroll', () => {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const progress = (carousel.scrollLeft / maxScroll) * 100;
        progressBar.style.width = Math.min(progress + 25, 100) + '%';
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const stepperDots = document.querySelectorAll('.stepper-dot');
    const subjectGroups = document.querySelectorAll('.subjects-group');
    const headingTitle = document.getElementById('semester-heading-title');
    const headingCount = document.getElementById('semester-heading-count');

    const nombresOrdinales = {
        1: '1er Semestre', 2: '2do Semestre', 3: '3er Semestre', 4: '4to Semestre',
        5: '5to Semestre', 6: '6to Semestre', 7: '7mo Semestre', 8: '8vo Semestre'
    };

    function mostrarSemestre(numero) {
        stepperDots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.semester === String(numero));
        });

        subjectGroups.forEach(group => {
            group.hidden = group.dataset.semesterGroup !== String(numero);
        });


        const grupoActivo = document.querySelector(`.subjects-group[data-semester-group="${numero}"]`);
        const totalMaterias = grupoActivo ? grupoActivo.querySelectorAll('.subject-row').length : 0;
        headingTitle.textContent = nombresOrdinales[numero] || `Semestre ${numero}`;
        headingCount.textContent = `${totalMaterias} Asignatura${totalMaterias !== 1 ? 's' : ''}`;

        animarMaterias(numero);
    }

    stepperDots.forEach(dot => {
        dot.addEventListener('click', () => {
            mostrarSemestre(dot.dataset.semester);
        });
    });

    document.querySelectorAll('.subject-row').forEach(row => {
        row.addEventListener('click', () => {
            row.classList.toggle('expanded');
        });
    });

    mostrarSemestre(1);
});

// ANIMACIÓN: Título de la malla curricular al hacer scroll

document.addEventListener('DOMContentLoaded', function () {

    const tituloMalla = document.querySelectorAll('.curriculum-section .section-tag, .curriculum-section .section-title, .curriculum-section .section-subtitle');

    const observerTitulo = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada, index) => {
            if (entrada.isIntersecting) {
                setTimeout(() => {
                    entrada.target.classList.add('anim-visible');
                }, index * 150); // pequeño retraso entre cada elemento
                observerTitulo.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.2 });

    tituloMalla.forEach(el => observerTitulo.observe(el));

});

function animarMaterias(numero) {
    const grupoActivo = document.querySelector(`.subjects-group[data-semester-group="${numero}"]`);
    if (!grupoActivo) return;

    const filas = grupoActivo.querySelectorAll('.subject-row');

    filas.forEach((fila, index) => {
        fila.classList.remove('fila-visible');

        void fila.offsetWidth;

        setTimeout(() => {
            fila.classList.add('fila-visible');
        }, index * 80); // 80ms entre cada materia
    });
}


let indiceEventoActual = 0;

function irAEvento(nuevoIndice) {
    const tarjetas = document.querySelectorAll('.tarjeta-evento');
    const dots = document.querySelectorAll('.carrusel-dots .dot');
    const totalTarjetas = tarjetas.length;
    
    indiceEventoActual = nuevoIndice;

    tarjetas.forEach(tarjeta => {
        tarjeta.classList.remove('active', 'next-card', 'prev-card');
    });
    dots.forEach(dot => dot.classList.remove('active'));

    tarjetas[indiceEventoActual].classList.add('active');
    dots[indiceEventoActual].classList.add('active');

    let siguienteIndice = (indiceEventoActual + 1) % totalTarjetas;
    tarjetas[siguienteIndice].classList.add('next-card');

    let anteriorIndice = (indiceEventoActual - 1 + totalTarjetas) % totalTarjetas;
    tarjetas[anteriorIndice].classList.add('prev-card');
}

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.carrusel-track');
    if(track) {
        track.addEventListener('click', (e) => {
            const tarjetaClickeada = e.target.closest('.tarjeta-evento');
            if (!tarjetaClickeada) return;
            
            const tarjetas = Array.from(document.querySelectorAll('.tarjeta-evento'));
            const clickIndex = tarjetas.indexOf(tarjetaClickeada);
            
            if (tarjetaClickeada.classList.contains('next-card') || tarjetaClickeada.classList.contains('prev-card')) {
                irAEvento(clickIndex);
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const preguntas = document.querySelectorAll(".faq-pregunta");

    preguntas.forEach(pregunta => {
        pregunta.addEventListener("click", () => {
            const itemActual = pregunta.parentElement;
            const respuestaActual = itemActual.querySelector(".faq-respuesta");

            // Cerrar otros acordeones abiertos si se hace clic en uno nuevo (opcional, estilo limpio)
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== itemActual && item.classList.contains("active-faq")) {
                    item.classList.remove("active-faq");
                    item.querySelector(".faq-respuesta").style.maxHeight = null;
                }
            });

            // Alternar el estado del acordeón seleccionado
            itemActual.classList.toggle("active-faq");

            if (itemActual.classList.contains("active-faq")) {
                // Abre ajustando el tamaño exacto del contenido de la respuesta
                respuestaActual.style.maxHeight = respuestaActual.scrollHeight + "px";
            } else {
                // Cierra colapsando la altura
                respuestaActual.style.maxHeight = null;
            }
        });
    });
});
