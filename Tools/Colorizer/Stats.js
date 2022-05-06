
const values = {
    colored : 0 ,
    found : 0
};

export function update(type,value){
    values[type] = value;
}

export default function(){
    return values;
}