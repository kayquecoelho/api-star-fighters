import joi from "joi";

export interface Battle {
  firstUser: string,
  secondUser: string
}

const battleSchema = joi.object<Battle>({
	"firstUser": joi.string().required(),
  "secondUser": joi.string().required()
});

export default battleSchema;