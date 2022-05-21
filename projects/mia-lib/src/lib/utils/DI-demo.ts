/**
  * @description: Angular Dependency Injection – Understanding hierarchical injectors
  */

class DemoDIService {
  sayHi(): void { }
}

class MyComponent {
  constructor(public user: DemoDIService) { }
}

/* "Angular" DI */

class Injector {
  private _container = new Map();

  constructor(private _providers: Array<any> = new Array<any>()) {
    this._providers.forEach(service => this._container.set(service, new service()));
  }

  get(service: any) {
    const serviceInstance = this._container.get(service);

    if (!serviceInstance) {
      throw new Error('No provider found!');
    }
    return serviceInstance;
  }
}

//  Somewhere in application

const injector = new Injector([DemoDIService]);
const component = new MyComponent(injector.get(DemoDIService));
component.user.sayHi();