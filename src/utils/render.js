import AbstractView from "../view/abstract.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFORE: `before`
};

const {AFTERBEGIN, BEFOREEND, BEFORE} = RenderPosition;

export const render = (container, element, place = BEFOREEND, targetElement) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  if (targetElement instanceof AbstractView) {
    targetElement = targetElement.getElement();
  }

  switch (place) {
    case AFTERBEGIN:
      container.prepend(element);
      break;
    case BEFOREEND:
      container.append(element);
      break;
    case BEFORE:
      container.insertBefore(element, targetElement);
  }
};

export const renderTemplate = (container, markup, place = BEFOREEND) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, markup);
};

export const createElement = (markup) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = markup;

  return newElement.firstElementChild;
};

export const replace = (oldElement, newElement) => {
  if (oldElement instanceof AbstractView) {
    oldElement = oldElement.getElement();
  }

  if (newElement instanceof AbstractView) {
    newElement = newElement.getElement();
  }

  if (oldElement === null || newElement === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  oldElement.replaceWith(newElement);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
