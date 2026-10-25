import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const motion = gsap.matchMedia();

motion.add('(prefers-reduced-motion: no-preference)', () => {
  const scrollTriggers: ScrollTrigger[] = [];
  const intro = document.querySelector('.intro');

  if (intro) {
    const entrance = gsap.timeline({ defaults: { ease: 'power2.out' } });
    entrance
      .from('.intro-topline', { autoAlpha: 0, y: 12, duration: 0.45 })
      .from('#intro-title', { autoAlpha: 0, y: 24, duration: 0.65 }, '-=0.2')
      .from('.intro-base > *', { autoAlpha: 0, y: 16, duration: 0.55, stagger: 0.12 }, '-=0.25');
  }

  document.querySelectorAll('.section-heading, .recognition-row, .interest-list li, .about-photo, .about-copy, .contact-row').forEach((element) => {
    const reveal = gsap.fromTo(
      element,
      { autoAlpha: 0, y: 18, immediateRender: false },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      },
    );
    if (reveal.scrollTrigger) scrollTriggers.push(reveal.scrollTrigger);
  });

  const projects = [...document.querySelectorAll<HTMLElement>('.project')];
  const progress = document.querySelector<HTMLElement>('.project-progress');
  const currentNumber = progress?.querySelector<HTMLElement>('.project-progress-current');
  const progressFill = progress?.querySelector<HTMLElement>('.project-progress-fill');

  const setActiveProject = (index: number) => {
    projects.forEach((project, projectIndex) => {
      project.classList.toggle('is-active', projectIndex === index);
    });

    if (progress) {
      progress.setAttribute('aria-valuenow', String(index + 1));
      progress.setAttribute('aria-valuetext', `Project ${index + 1} of ${projects.length}`);
    }
    if (currentNumber) currentNumber.textContent = String(index + 1).padStart(2, '0');
    if (progressFill) {
      gsap.to(progressFill, { scaleX: (index + 1) / projects.length, duration: 0.4, ease: 'power2.out' });
    }
  };

  projects.forEach((project, index) => {
    const entrance = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: { trigger: project, start: 'top 76%', once: true },
    });
    const number = project.querySelector('.project-number');
    const heading = project.querySelector('.project-title-block');
    const visual = project.querySelector('.project-visual');
    const description = project.querySelector('.project-description-block');
    const meta = project.querySelector('.project-meta');

    if (number) entrance.fromTo(number, { autoAlpha: 0, x: -14, immediateRender: false }, { autoAlpha: 1, x: 0, duration: 0.45 }, 0);
    if (heading) entrance.fromTo(heading, { autoAlpha: 0, y: 20, immediateRender: false }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.08);
    if (visual) entrance.fromTo(visual, { autoAlpha: 0, y: 24, immediateRender: false }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.22);
    if (description) entrance.fromTo(description, { autoAlpha: 0, y: 16, immediateRender: false }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.34);
    if (meta) entrance.fromTo(meta, { autoAlpha: 0, y: 16, immediateRender: false }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.44);
    if (entrance.scrollTrigger) scrollTriggers.push(entrance.scrollTrigger);

    const activeTrigger = ScrollTrigger.create({
      trigger: project,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveProject(index),
      onEnterBack: () => setActiveProject(index),
    });
    scrollTriggers.push(activeTrigger);
  });

  const viewportCenter = window.innerHeight / 2;
  let restoredIndex = -1;
  projects.forEach((project, index) => {
    if (project.getBoundingClientRect().top <= viewportCenter) restoredIndex = index;
  });
  if (restoredIndex >= 0) setActiveProject(restoredIndex);

  return () => {
    scrollTriggers.forEach((trigger) => trigger.kill());
  };
});
