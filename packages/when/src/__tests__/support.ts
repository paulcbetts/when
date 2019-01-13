import { of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Model, notify } from '../model';
import { Updatable } from '../updatable';

@notify('foo', 'bar', 'arrayFoo')
export class TestClass extends Model {
  someSubject: Subject<number>;
  foo: number;
  bar: number | TestClass;
  baz: number;
  arrayFoo: number[];
  updatableFoo: Updatable<number>;

  derived: number;
  subjectDerived: number;

  get explodingProperty(): TestClass {
    throw new Error('Kaplowie');
  }

  constructor() {
    super();
    this.arrayFoo = [1];
    this.updatableFoo = new Updatable(() => of(6));
    this.someSubject = new Subject();

    this.toProperty(of(42), 'derived');

    this.toProperty(
      this.someSubject.pipe(
        map((x) => x * 10),
        startWith(0),
      ),
      'subjectDerived',
    );
  }
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe('The test runner', function() {
  it('should pass this test', async function() {
    await delay(1000);
    expect(true).toBeTruthy();
  });
});
