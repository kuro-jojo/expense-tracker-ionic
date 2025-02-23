import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonImg } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-onboarding',
    templateUrl: './onboarding.component.html',
    styleUrls: ['./onboarding.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [CommonModule, IonImg, RouterLink]
})
export class OnboardingComponent implements OnInit {
    @ViewChild('slider') slider: ElementRef | undefined;

    constructor() { }

    ngOnInit() {

    }

    onSliderChange($event: Event) {
        let swiperEvent = $event as CustomEvent;
        const page = swiperEvent.detail[0].activeIndex

        if (this.slider) {
            let ch = this.slider.nativeElement.children;
            for (let i = 0; i < ch.length; i++) {
                if (i == page) {
                    ch[i].classList.add('active');
                } else {
                    ch[i].classList.remove('active');
                }
            }
        }
    }
}
