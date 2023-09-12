import { ref, nextTick } from "vue";

interface Line {
    id: number;
    line: string;
}

interface userAnswer {
    pin: number;
    answer: string;
}

export default function common() {
    const apiUrl = process.env.API_BASE_URL;

    const scriptLines = ref<Line[]>([]);
    const typedText = ref("");
    const userName = ref("");
    const loginPrompt = ref("Username: ")
    const CPUName = "Adam64"
    const scriptPin = ref(0)
    const userAnswer = ref<userAnswer[]>([])

    const yes_list = ["Y", "y", "yes", "YES", "Yes"]
    const no_list = ["N", "n", "no", "NO", "No"]

    const showCursor = ref(true);
    const awaitingUserInput = ref(false);

    const showMatrixRain = ref(false);

    // スクリプトに引数で渡された文字列を加える
    function addLine(line: string, is_user: boolean = false) {
        if (is_user) {
            line = `[${userName.value}] ${line}`
        }
        scriptLines.value.push({ id: Date.now(), line });
    }

    // typedTextに、渡されたCPUのセリフを1文字ずつ追加する
    // 表示し終わったらスクリプトに追加、typedTextをクリアする
    async function typeLine(line: string, is_CPU: boolean = false, tail:string = "") {
        awaitingUserInput.value = false;

        if (is_CPU) {
            typedText.value += `[${CPUName}]　`
        }

        await delay(300);

        for (const char of line) {
            typedText.value += char;
            await delay(200);
        }

        // 末尾に[Y/n]などがあれば追加
        if(tail){
            await delay(500);
            typedText.value += tail;
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
        saveUserAnswer(userInputValue)

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
                await typeLine("Wanna play with me ?", true, "  [Y/n]");
                await delay(300);
                await nextTick();
                break;
            case 1:
                await delay(500);
                const answer = userAnswer.value.find(e => e.pin === scriptPin.value)?.answer?? "";
                if( yes_list.includes(answer) ){
                    await typeLine("OK, come with me !", true);
                    showMatrixRain.value = true;
                } else if (no_list.includes(answer)) {
                    await typeLine("Ok... Bye.", true);
                }
                break;
        }

        scriptPin.value += 1;

    }

    function saveUserAnswer(userInputValue:string){
        userAnswer.value.push({ pin: scriptPin.value, answer: userInputValue });
    }

    return {
        scriptLines, typedText, showCursor, awaitingUserInput, userName, loginPrompt,
        CPUName, scriptPin, showMatrixRain, addLine, typeLine, delay, processUserInput
    };

}