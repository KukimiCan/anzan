let ans = 0;
let ans_len = 0;
let input = "";
let input_len = 0
let start_flg = 0;
let startTime = 0
let elapsedTime = 0
let player_ans = 0
let q_num = 0
let false_num = 0
let max_q = 5
let time = 0

sessionStorage.clear();


function makeQuestion(isFirst) //問題の作成、表示
{
    if (isFirst == true)
    {
        ans = 1729;
        ans_len = 4;
        document.getElementById("question").innerText = "91 × 19";
        document.getElementById("question").style.color = "#839393"

    }
    else
    {
        q_num ++;

        let a = 10 + Math.floor(Math.random()*90);
        let b = 10 + Math.floor(Math.random()*90);
        let q = String(a) + " × " + String(b);
        
        ans = a*b;
        ans_len = String(ans).length;

        document.getElementById("question").innerText = q;
        document.getElementById("question").style.color = "#010101"
    }

    player_ans = "_".repeat(ans_len);

    document.getElementById("answer").innerText = player_ans;
}


const nthReplace = (str, n, after) => {
    return str.substr(0, n - 1) + after + str.substr(n);
};


document.addEventListener('keyup', function(event) //キー入力を検知
{
    let k = event.key;
    console.log(k)

    if (k in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
    {
        input = input + k;
        input_len ++;
        player_ans = nthReplace(player_ans, input_len, k)

        if (input_len == ans_len)
        {
            if (Number(input) == ans) //正解
            {
                input = "";
                input_len = 0;

                document.body.style.backgroundColor = "#eaf4fc";

                if (start_flg == 0)
                {
                    startTime = Date.now();
                    start_flg = 1;
                }

                elapsedTime = Date.now() - startTime;
                time += elapsedTime;
                document.getElementById("timer").innerText = time;
                document.getElementById("timer").style.color = "#000"
                
                if (q_num == max_q)
                {
                    sessionStorage.setItem('elapsedtime', time);
                    sessionStorage.setItem('false_num', false_num);
                    window.location.href = "../result/result.html";
                }
                else
                {
                    makeQuestion(false);
                }

            }
            else //誤答
            {
                if (start_flg != 0)
                {
                    false_num ++;
                    time += false_num*10000;
                }
                
                input = "";
                input_len = 0;
                player_ans = "_".repeat(ans_len);

                document.body.style.backgroundColor = "#f4b3c2";

            }
        }
    }

    else if (k == "Backspace") //削除
    {
        input = input.slice( 0, -1 );
        player_ans = nthReplace(player_ans, input_len, "_");
        input_len --;
    }
    else if (k == "Escape")
    {
        window.location.href = "../index.html"
    }

    document.getElementById("answer").innerText = player_ans;
});
