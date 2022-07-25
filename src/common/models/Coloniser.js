export class Coloniser {
  constructor(name, x, y, speed, icon) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.icon = icon;
  }

  getName() {
    return this.name;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getSpeed() {
    return this.speed;
  }

  getIcon() {
    return this.icon;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setIcon(icon) {
    this.icon = icon;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
}
