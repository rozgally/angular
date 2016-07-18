function getDomain(email) {
	return str.slice(str.indexOf('@')+1,str.length);
}


function getLocalPart(email) {
	return str.slice(0,str.indexOf('@')-1);
}

function compareStrings(s1, s2) {
	return (s1 > s2) - (s1 < s2)
}

function stringComparator(s1, s2) {
	return compareStrings(s1.value, s2.value)
}

function compareDomains(email1, email2) {
	return compareStrings(getDomain(email1), getDomain(email2))
}

function compareLocalParts(email1, email2) {
	return compareStrings(getLocalPart(email1), getLocalPart(email2))
}

function mailboxComparator(email1, email2) {
	return compareDomains(email1.value, email2.value) || compareLocalParts(email1.value, email2.value)
}

function getIpSum(ip) {
	var sum = 0
	var parts = ip.split('.')
	for (i = 0; i < parts.length; i++) {
		sum = sum << 8
		var int = parseInt(parts[i])
		if (int) { // check will skip undefined
			sum += int
		}
	}
	return sum >>> 0
}

function ipComparator(ip1, ip2) {
	return getIpSum(ip1.value) - getIpSum(ip2.value)
}

function getComparatorByType(type) {
	switch (type) {
		case 'mailbox':
			return mailboxComparator
		case 'mail-server', 'trusted-ip':
			return ipComparator
		default:
			return stringComparator
	}
}

/**
* Returns collection with items not matching type removed.
*/
function filterByType(collection, type) {
	result = []
	for (var i = 0; i < collection.length; i++) {
		if (collection[i].type == type) {
			result.push(collection[i])
		}
	}
	return result
}

/**
* Returns collection sorted by type, then by type dependant comparator.
*/
function sort(collection) {
	var partition = {}

	for (var i = 0; i < collection.length; i++) {
		if (!Array.isArray(partition[collection[i].type])) {
			partition[collection[i].type] = []
		}
		partition[collection[i].type].push(collection[i])
	}

	for (var type in partition) {
		comparator = getComparatorByType(type)
		partition[type].sort(comparator)
	}
	console.log("Partition::"+partition);
	types = Object.keys(partition)
	types.sort(compareStrings)

	var result = []
	for (var type of types) {
		result = result.concat(partition[type])
	}

	return result
}

var testData = [
{type: "mailbox", value: "bob@example.com"},
{type: "trusted-ip", value: "203.84.134.17"},
{type: "mail-server", value: "216.58.220.101"},
{type: "mail-server", value: "203.48.223.100"},
{type: "mailbox", value: "big.bird@example.com"},
{type: "mailbox", value: "jim@acme.com"},
{type: "trusted-ip", value: "222.88.133.177"}
]

console.log(sort(testData))
console.log(filterByType(testData, 'mailbox'))

------ CONSOLE OUTPUT ----------

[ { type: 'mail-server', value: '203.48.223.100' },
{ type: 'mail-server', value: '216.58.220.101' },
{ type: 'mailbox', value: 'jim@acme.com' },
{ type: 'mailbox', value: 'big.bird@example.com' },
{ type: 'mailbox', value: 'bob@example.com' },
{ type: 'trusted-ip', value: '203.84.134.17' },
{ type: 'trusted-ip', value: '222.88.133.177' } ]
[ { type: 'mailbox', value: 'bob@example.com' },
{ type: 'mailbox', value: 'big.bird@example.com' },
{ type: 'mailbox', value: 'jim@acme.com' } ]
