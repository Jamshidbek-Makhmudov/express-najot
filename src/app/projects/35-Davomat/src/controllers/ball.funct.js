function ballMark(ball){
    if(ball>=0 && ball<59){
        return 2;
    } else if(ball>=60 && ball<70){
        return 3; 
    }else if(ball>=70 && ball<80){
        return 4;
    } else if(ball>=80 && ball<=100){
        return 5;
    }
}

function time(endTime, createAt, ball){
    let sum
    const diff = createAt.getTime()-  endTime.getTime();
    const result = diff/60000

    if (result>0){
        return ball;
    } else{
        const minut = (result/5)*(-1);
   
        if(minut>ball){
            return 0
        } else if(minut<ball){
            sum = ball - (minut*5)
            return sum;
        }      
    }
}


module.exports = {ballMark, time}