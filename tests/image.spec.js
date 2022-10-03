const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

const sandbox = sinon.createSandbox();

let imageController = rewire('../src/Controller');

describe('Testing /image endpoint', () => {
    let sampleImagedata;
    let findOneStub;
    let getReqBody;

    beforeEach(() => {
        sampleImagedata = {
            date: "2022-10-02",
            imageUrl: "images/panCard.jpeg",
            name: "panCard.jpeg",
            format: "jpeg",
            mimetype: "image/jpeg",
            encoding: "7bit",
        };

        getReqBody={
            filename:"images/panCard.jpeg",
            from:"2022-10-02"
        }

        findOneStub = sandbox.stub(mongoose.Model, 'find').resolves(sampleImagedata);
    });

    afterEach(() => {
        imageController = rewire('../src/Controller');
        sandbox.restore();
    });

    describe('POST /get_images', () => {
        it('should return error when called without valid obj', async () => {
            imageController.getImage()
                .then(() => {
                    throw new Error('⚠️ Unexpected success!');
                })
                .catch((err) => {
                    expect(result).to.be.instanceOf(Error);
                    expect(err.message).to.equal('Invalid body parameters');
                })
        });

        it('should succeed when called with valid valid obj', async () => {
            imageController.getImage(getReqBody)
                .then((img) => {
                    expect(img).to.equal(sampleImagedata);
                })
                .catch((err) => {
                    throw new Error('⚠️ Unexpected failure!');
                })
        });
    });


    // describe('POST /upload', () => {
    //     let itemModelStub, saveStub, result;


    //     it('should throw invalid argument error', () => {
    //         imageController.createItem()
    //             .then(() => {
    //                 throw new Error('⚠️ Unexpected success!');
    //             })
    //             .catch(err => {
    //                 expect(result).to.be.instanceOf(Error);
    //                 expect(err.message).to.equal('Invalid arguments');
    //             })
    //     });

    //     it('should create item successfully', async () => {
    //         result = await imageController.createItem(sampleImagedata);
    //         expect(itemModelStub).to.have.been.calledWithNew;
    //         expect(itemModelStub).to.have.been.calledWith(sampleImagedata);
    //         expect(saveStub).to.have.been.called;
    //         expect(result).to.equal(sampleImagedata);
    //     });
    // });
});