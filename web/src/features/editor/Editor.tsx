import { useState } from "preact/hooks";
import editorStyle from "./Editor.module.css";
import { useJSEditor } from "./hooks/useEditor";
import { useRunCode } from "./hooks/useRunCode";
import type { FC } from "preact/compat";

//TODO: use indexedDB or localStorage to store and pick up the code
const INITIAL_CODE = `// let's try some code
const add = (a, b) => a + b;
const result = add(1, 2);
console.log(result);
`;

type Props = {
	handleLogger: (messages: string[]) => void;
};

const Editor: FC<Props> = ({ handleLogger }) => {
	const [code, setCode] = useState<string>(INITIAL_CODE);
	const { editor } = useJSEditor({ code, setCode });
	const { runJS } = useRunCode();

	const handleClick = async () => {
		const evaluated = await runJS({ code });
		handleLogger(evaluated);
	};

	return (
		<div className={editorStyle.container}>
			<div class={editorStyle.buttonGroup}>
				<button
					type="button"
					className={editorStyle.runButton}
					onClick={handleClick}
				>
					Run Code
				</button>
				{/* <button
					type="button"
					className={editorStyle.runButton}
				>
					Share with URL
				</button> */}
			</div>
			<div ref={editor} />
		</div>
	);
};

export { Editor };
