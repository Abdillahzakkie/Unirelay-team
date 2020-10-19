//"SPDX-License-Identifier: UNLICENSED"

pragma solidity >=0.4.0 <0.8.0;
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";


contract Token is Initializable {
    using SafeMath for uint256;
    // using Address for address;

    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;

    function initialize(string memory name, string memory symbol) initializer public {
        _name = name;
        _symbol = symbol;
        _decimals = 18;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        require(amount > 0);
        require(_balances[msg.sender] >= amount, "ERC20: approve amount exceeds balance");
        _allowances[msg.sender][spender] = amount;
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        require(
            _allowances[sender][recipient] > 0 &&
            amount > 0 &&
            _allowances[sender][msg.sender] <=  amount,
            "ERC20: transfer amount exceeds allowance"
        );

        _allowances[sender][recipient] = _allowances[sender][recipient].sub(amount);
        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        return true;
    }

    function transfer(address _recipient, uint _amount) public returns(bool) {
        require(balanceOf(msg.sender) >= _amount, "ERC20: transfer amount exceeds allowance");
        require(_amount > 0);
        _balances[msg.sender] = _balances[msg.sender].sub(_amount);
        _balances[_recipient] = _balances[_recipient].sub(_amount);
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }
    
    function mint(address account, uint256 amount) public {
        require(account != address(0), "ERC20: mint to the zero address");
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
    }
}