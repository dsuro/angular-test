import { CarColorPipe } from './car-color.pipe';

/*Test Suite */
describe('Pipe::CarColorPipe', () => {
  let pipe:CarColorPipe;
  beforeEach(()=>{
    pipe = new CarColorPipe();
  });

  it('should create an instance', () => {
    
    expect(pipe).toBeTruthy();
  });

  it('should test Red color', () => {
    expect(pipe.transform('Red')).toBe('Red');
  });
});
