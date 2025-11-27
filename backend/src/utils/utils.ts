export const safeFind = (list: any[], predicate: (item: any) => boolean, onNotFound: () => void): any | undefined => {
  const item = list.find(predicate);
  if (!item) onNotFound();
  return item;
}

export const shuffle = (array: Array<any>): Array<any> => {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};




