import config from '../config';
import EventEmitter from 'eventemitter3';

const EVENTS = {
  APP_READY: 'app_ready',
};

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application extends EventEmitter {
  constructor() {
    super();

    this.config = config;
    this.data = {};

    this.init();
  }

  static get events() {
    return EVENTS;
  }

    async get events() {
        const planets = [];
        let response = await fetch('https://swapi.dev/api/planets/');

        let data = await response.json();

        planets.push(data);
        while (data.next) {
            response = await fetch(`${data.next}`);

            data = await response.json();
            planets.push(data);
        }
        const planetsCollection = planets
            .map((x) => x.results.map((c) => c))
            .flat();

            this.data.count = planetsCollection.length;
            this.data.planets = planetsCollection;
    }

  /**
   * Initializes the app.
   * Called when the DOM has loaded. You can initiate your custom classes here
   * and manipulate the DOM tree. Task data should be assigned to Application.data.
   * The APP_READY event should be emitted at the end of this method.
   */
  async init() {
    // Initiate classes and wait for async operations here.

    await this.setData();

    this.emit(Application.events.APP_READY);
  }
}

