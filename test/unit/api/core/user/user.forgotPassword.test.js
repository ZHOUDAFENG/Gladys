
describe('User', function() {
  describe('forgotPassword', function() {
    it('should start a forgotPassword procedure', function(done) {
      gladys.user
        .forgotPassword({ email: 'tony.stark@starkindustry.com' })
        .then(result => {
          done();
        })
        .catch(done);
    });
  });
});
