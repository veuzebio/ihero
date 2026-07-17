import { TestBed } from '@angular/core/testing';
import { Hero } from './hero';
import { profile } from '../../data/profile';

describe('Hero', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Hero);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the name in h1', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1?.textContent).toContain(profile.name);
  });

  it('should render the title in h2', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2?.textContent).toContain(profile.title);
  });

  it('should have section labelled by h1', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const section = fixture.nativeElement.querySelector('section');
    const labelId = section?.getAttribute('aria-labelledby');
    const heading = fixture.nativeElement.querySelector(`#${labelId}`);
    expect(heading?.tagName.toLowerCase()).toBe('h1');
  });

  it('should render the bio in p', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    const p = fixture.nativeElement.querySelector('p');
    expect(p?.textContent).toContain(profile.bio);
  });

  it('should not contain the greeting placeholder', async () => {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).not.toContain('Olá, mundo');
  });
});
