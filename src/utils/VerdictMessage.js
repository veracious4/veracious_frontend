var verdictMessage = (trustScore) => {
    if(trustScore <= 20)
        return "Veracious say the fact is Incorrect";
    else if(trustScore > 20 && trustScore <= 40)
        return "Veracious say the fact is mostly Incorrect";
    else if(trustScore > 40 && trustScore <= 60)
        return "Veracious has a neutral stance";
    else if(trustScore > 60 && trustScore <= 80)
        return "Veracious say the fact is mostly Correct";
    else 
        return "Veracious say the fact is Correct";
}

export default verdictMessage;