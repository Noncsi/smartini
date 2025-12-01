import { Epic } from "redux-observable";
import { filter, mergeMap, from, map, tap } from "rxjs";
import { mapQuestionApiResponseToQuestion } from "../../../utils/mappers";
import { RootState } from "../../config/store";
import { GameActions } from "../../types/game.actions";
import { IQuestionApiResponse, Question } from "../../types/game.types";
import { fetchQuestion, fetchQuestionSuccess } from "../game.slice";

export const fetchQuestionEpic: Epic<GameActions, GameActions, RootState> = (
  action$
) =>
  action$.pipe(
    filter(fetchQuestion.match),
    mergeMap(({ payload }) => {
      const { roomCode } = payload;
      return from(
        fetch("https://opentdb.com/api.php?amount=1&type=multiple").then(
          (response) => response.json()
        )
      ).pipe(
        map((apiResponse: IQuestionApiResponse) =>
          mapQuestionApiResponseToQuestion(apiResponse)
        ),
        map((question: Question) =>
          fetchQuestionSuccess({ roomCode, question })
        )
      );
    })
  );