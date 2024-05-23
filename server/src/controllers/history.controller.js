import { History } from "../models/history.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createHistory = asyncHandler(async (req, res) => {
  const { advice } = req.body;
  if (!advice) {
    throw new ApiError(404, "Response is required");
  }
  try {
    const history = await History.create({ advice });

    return res.status(201).json(
      new ApiResponse(
        200,
        {
          history: history,
        },
        "history created successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, "Error creating History", error.message);
  }
});
const getHistory = asyncHandler(async (req, res) => {
  try {
    const history = await History.find();

    return res.status(201).json(
      new ApiResponse(
        200,
        {
          history: history,
        },
        "history fetched successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, "Error creating History", error.message);
  }
});

export { createHistory, getHistory };
