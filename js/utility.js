
//Elements
function swipeClases(item, from, to) { item?.classList.replace(from, to); }
function removeClass(item, name) { item?.classList.remove(name); }
function addClass(item, name) { item?.classList.add(name); }


//Logic
const shuffleArray = array =>
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}