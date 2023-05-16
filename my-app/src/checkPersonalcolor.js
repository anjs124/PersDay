function getSeasonalTone(hairR, hairG, hairB, hairH, hairS, hairV, faceR, faceG, faceB, faceH, faceS, faceV) {
    if(hairR===0 && hairG===0 && hairB===0 && hairH===0 && hairS===0 && hairV===0 && faceR===0 && faceG===0 && faceB===0 && faceH===0 && faceS===0 && faceV===0){
        return " ";
    }else{
        let cool = 0;
        if (hairV < 20 || (hairV < 50 && (hairR === 0 || hairG === 0)) || (hairV < 50 && hairB > 100)) {
            cool++;
        }
        if (faceH < 33 || faceH > 300) {
            cool++;
        }
        if (cool >= 1) {
            if (faceV >= 235) {
                return "Winter Cool";
            } else {
                return "Summer Cool";
            }
        } else {
            if (faceG - faceB > 20) {
                return "Spring Warm";
            } else {
                return "Autumn Warm";
            }
        }
    }    
    
  }
  
  export { getSeasonalTone };