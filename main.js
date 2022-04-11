/* Moralis init code */
const serverUrl = "https://erqncsglvhlj.usemoralis.com:2053/server";
const appId = "fOtRalpIawZSov3mH68ZxecXYjYqNhacRxGICSh0";
Moralis.start({ serverUrl, appId });

const CONTRACTADDRESS= "0xb492dAb3Ab7820ae1CB32e91E6213A887E50E0B3";
const ABI= [
	{
		"inputs": [],
		"name": "enter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sendFundToContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "random",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
async function login() {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate({
        signingMessage: "Log in using Moralis",
      })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  
  async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
  }

  async function enterLottery(){
    const web3 = await Moralis.enableWeb3({ });
    // sending 0.1 ETH
    let options= {
        contractAddress: CONTRACTADDRESS,
        functionName: "enter",
        abi: ABI,
        msgValue: Moralis.Units.ETH("0.1")
    }
    const transaction = await Moralis.executeFunction(options);
    console.log(transaction.hash);
	prompt("Entering the Lottery, Please wait...");

    const result = await transaction.wait();
	console.log(result);
	if(result != "undefined"){
		alert("Congrats, Entered the lottery");
	}
	document.getElementById("winnerId").innerHTML = "To Be Announced";
  }

  async function donateFunds(){
	const web3 = await Moralis.enableWeb3({ });
	//sending 1 ETH
	let options= {
        contractAddress: CONTRACTADDRESS,
        functionName: "sendFundToContract",
        abi: ABI,
        msgValue: Moralis.Units.ETH("1")
    }
    const transaction = await Moralis.executeFunction(options);
    console.log(transaction.hash);

    const result = await transaction.wait();
	console.log(result);
  }

  async function pickWinner(){
	const web3 = await Moralis.enableWeb3({ });
	  let options= {
		contractAddress: CONTRACTADDRESS,
        functionName: "pickWinner",
        abi: ABI
	  }
	  const pickWinner = await Moralis.executeFunction(options);
	  console.log(pickWinner);
	  WinnerAddress();
  }

  async function WinnerAddress(){
	const web3 = await Moralis.enableWeb3({ });
    let options = {
        contractAddress: CONTRACTADDRESS,
        functionName: "getWinner",
        abi: ABI
    }
    const winner = await Moralis.executeFunction(options);
    document.getElementById("winnerId").innerHTML = winner.toString();
  }
  
//   document.getElementById("btn-login").onclick = login;
//   document.getElementById("btn-logout").onclick = logOut;


  document.getElementById("enter").onclick = enterLottery;
  document.getElementById("donate").onclick = donateFunds;
  document.getElementById("pickWinner").onclick = pickWinner;