import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  signal
} from '@angular/core';

@Directive({
  selector: '[scoreAnimate]',
  standalone: true
})
export class ScoreAnimateDirective {
  private lastScore = signal<number | null>(null);

  @Input('scoreAnimate') set score(value: number) {
    const previous = this.lastScore();
    this.lastScore.set(value);

    if (previous === null) return;
    if (previous === value) return;

    this.triggerAnimation();
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private triggerAnimation() {
    this.renderer.addClass(this.el.nativeElement, 'score-animate');

    setTimeout(() => {
      this.renderer.removeClass(this.el.nativeElement, 'score-animate');
    }, 800);
  }
}
