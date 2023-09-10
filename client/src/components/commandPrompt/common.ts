import { ref, onMounted } from "vue";

interface Line {
    id: number;
    line: string;
}

export default function common() {

    const scriptLines = ref<Line[]>([]);
    const typedText = ref("");
    const userName = ref("");
    const loginPrompt = ref("Username: ")
    const CPUName = "Adam64"
    const scriptPin = ref(0)

    const showCursor = ref(true);
    const awaitingUserInput = ref(false);

    // スクリプトに引数で渡された文字列を加える
    function addLine(line: string, is_user: boolean = false) {
        if (is_user) {
            line = `[${userName.value}] ${line}`
        }
        scriptLines.value.push({ id: Date.now(), line });
    }

    // typedTextに、渡されたCPUのセリフを1文字ずつ追加する
    // 表示し終わったらスクリプトに追加、typedTextをクリアする
    async function typeLine(line: string, is_CPU: boolean = false) {
        awaitingUserInput.value = false;

        if (is_CPU) {
            typedText.value += `[${CPUName}]　`
        }

        await delay(300);

        for (const char of line) {
            typedText.value += char;
            await delay(200);
        }
        addLine(typedText.value);
        typedText.value = "";
    }

    // ユーザー入力をオフにし、入力値をスクリプトに追加する
    // その後CPUの入力を行い、終わったら再度ユーザー入力に切り替える
    async function processUserInput() {
        awaitingUserInput.value = false;
        let userInputValue = ""

        if (typedText.value.trim() === "") return;

        userInputValue = typedText.value;

        if (scriptLines.value.length === 0) {
            userName.value = userInputValue
            loginPrompt.value += userInputValue
            addLine(loginPrompt.value);
        } else {
            addLine(typedText.value, true);
        }

        typedText.value = "";
        await callScript();

        awaitingUserInput.value = true;

    }

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ストーリーの進行に合わせたスクリプトを表示する
    async function callScript(){
        switch (scriptPin.value) {
            case 0:
                await delay(500);
                await typeLine("　");
                await typeLine("Logging in... ");
                await typeLine("　");
                await delay(500);
                await typeLine(`Nice to meet you, ${userName.value}.`, true);
                await delay(500);
                await typeLine("What's your email?", true);
                break;
            case 1:
                await delay(500);
                await typeLine("Thank you for sharing your email!", true);
                break;
        }

        scriptPin.value += 1;

    }

    return {
        scriptLines, typedText, showCursor, awaitingUserInput, userName, loginPrompt,
        CPUName, scriptPin, addLine, typeLine, delay, processUserInput
    };

}