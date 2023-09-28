const randomOtp = () => {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
};
//math.random() bu ozi 0 va 1 sonlarida random son tanlaydi
module.exports = randomOtp;
