import { userModel } from "../../database/model/user.model.js";

export const getAllUsers = async (req, res) => {
  if (req.bearer == "admin") {
    let users = await userModel.find();
    if (users.length) {
      res.json({ message: "success", data: users });
    } else {
      res.json({ message: "no users found" });
    }
  } else {
    res.json({ message: "admin only" });
  }
};
export const getUserById = async (req, res) => {
  if (req.bearer == "admin") {
    let { id } = req.params;
    let user = await userModel.findById(id);
    if (user) {
      res.json({ message: "success", data: user });
    } else {
      res.json({ message: "no user found" });
    }
  } else {
    res.json({ message: "admin only" });
  }
};
export const banUser = async (req, res) => {
  if (req.bearer == "admin") {
    let { id } = req.params;
    let user = await userModel.findById(id);
    if (user && user.isActive) {
      let banUser = await userModel.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true },
      );
      if (banUser) {
        res.json({ message: "success, ban user", data: banUser });
      } else {
        res.json({ message: "error while banning" });
      }
    } else {
      res.json({ message: "no user found or already ban" });
    }
  } else {
    res.json({ message: "admin only" });
  }
};
export const unBanUser = async (req, res) => {
  if (req.bearer == "admin") {
    let { id } = req.params;
    let user = await userModel.findById(id);
    if (user && !user.isActive) {
      let unBanUser = await userModel.findByIdAndUpdate(
        id,
        { isActive: true },
        { new: true },
      );
      if (unBanUser) {
        res.json({ message: "success, unban user", data: unBanUser });
      } else {
        res.json({ message: "error while banning" });
      }
    } else {
      res.json({ message: "no user found or already unban" });
    }
  } else {
    res.json({ message: "admin only" });
  }
};
export const deleteUser = async (req, res) => {
  if (req.bearer == "admin") {
    let { id } = req.params;
    let user = await userModel.findByIdAndDelete(id);
    if (user) {
      res.json({ message: "success, deleted user", data: user });
    } else {
      res.json({ message: "no user found" });
    }
  } else {
    res.json({ message: "admin only" });
  }
};
