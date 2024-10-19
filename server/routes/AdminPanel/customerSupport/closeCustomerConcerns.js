const router = require("express").Router();
const { support_model } = require("../../../models/UserPanel/customerSupport");

module.exports = router.put("/", async (req, res) => {
  try {
    const { _id } = req.body;

    // Update the isActiveUser field to false for the specified user email
    const updatedStatus = await support_model.findOneAndUpdate(
      { _id: _id },
      { $set: { status: false } },
      { new: true } 
    );

    const updateStatusById = async (model, id, status) => {
        const updatedDocument = await model.findOneAndUpdate(
          { _id: id },
          { $set: { status: status } },
          { new: true }
        );
        return updatedDocument;
    };

    
    // Check if the user was found and updated
    if (!updatedStatus) {
      return res.status(404).send({ message: "No Message Found" });
    }

    return res
      .status(200)
      .send({ message: "Message status updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
