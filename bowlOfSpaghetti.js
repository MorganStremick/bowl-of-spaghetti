class Noodle {
  constructor (i)  {
    this.next = null;
    this.identifier = i;
  }
}

class LinkedNoodle {
  constructor (i) {
    const noodle = new Noodle(i);
    this.head = noodle
    this.tail = noodle;
  }

  link (linkedNoodle) {
    this.tail.next = linkedNoodle.head;
    this.tail = linkedNoodle.tail;
  }

  toString () {
    let str = '';
    let current = this.head;
    do {
      str += current.identifier + ', ';
      current = current.next;
    } while (current !== null && current !== this.head);
    return str;
  }
}

class Bowl {
  constructor (n) {
    this.noodles = new Array(n);
    _.each(this.noodles, (val, index) => this.noodles[index] = new LinkedNoodle(index + 1));
    this.loops = [];
  }

  link () {
    const previous = _.random(0, this.noodles.length - 1);
    const next = _.random(0, this.noodles.length - 1);
    this.noodles[previous].link(this.noodles[next]);
    if (previous === next) {
      this.loops.push(this.noodles[previous]);
    }
    this.noodles.splice(next, 1);
  }

  linkAll () {
    while (this.noodles.length > 0) {
      this.link();
    }
  }

  toString () {
    let str = '';
    for (const linkedNoodle of this.loops) {
      str += linkedNoodle.toString() + '\n';
    }
    return str;
  }
}

function test (noodles, bowls) {
  let sum = 0;
  for (let i = 0; i < bowls; i++) {
    const bowl = new Bowl(noodles);
    bowl.linkAll();
    sum += bowl.loops.length;
  }
  return sum / bowls;
}

console.log(test(100, 100));
