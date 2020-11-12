import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  abstract eventsMap(): {[key: string]: () => void };

  abstract template(): string;

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  bindEvents(container: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      container.querySelectorAll(selector).forEach((element: Element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
