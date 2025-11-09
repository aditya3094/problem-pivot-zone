export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  functionSkeleton: string;
  correctSolution: string;
}

export const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "HashMap"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    functionSkeleton: `public int[] twoSum(int[] nums, int target) {
    // Write your code here
    
}`,
    correctSolution: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}`
  },
  {
    id: 2,
    title: "Reverse String",
    difficulty: "Easy",
    tags: ["String", "Two Pointers"],
    description: "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
    examples: [
      {
        input: "s = ['h','e','l','l','o']",
        output: "['o','l','l','e','h']"
      }
    ],
    functionSkeleton: `public void reverseString(char[] s) {
    // Write your code here
    
}`,
    correctSolution: `public void reverseString(char[] s) {
    int left = 0;
    int right = s.length - 1;
    while (left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}`
  },
  {
    id: 3,
    title: "Palindrome Number",
    difficulty: "Easy",
    tags: ["Math"],
    description: "Given an integer x, return true if x is a palindrome, and false otherwise. An integer is a palindrome when it reads the same forward and backward.",
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads as 121 from left to right and from right to left."
      },
      {
        input: "x = -121",
        output: "false"
      }
    ],
    functionSkeleton: `public boolean isPalindrome(int x) {
    // Write your code here
    
}`,
    correctSolution: `public boolean isPalindrome(int x) {
    if (x < 0) return false;
    int original = x;
    int reversed = 0;
    while (x != 0) {
        reversed = reversed * 10 + x % 10;
        x /= 10;
    }
    return original == reversed;
}`
  },
  {
    id: 4,
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
    examples: [
      {
        input: "s = '()'",
        output: "true"
      },
      {
        input: "s = '([)]'",
        output: "false"
      }
    ],
    functionSkeleton: `public boolean isValid(String s) {
    // Write your code here
    
}`,
    correctSolution: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') {
            stack.push(c);
        } else {
            if (stack.isEmpty()) return false;
            char top = stack.pop();
            if (c == ')' && top != '(') return false;
            if (c == '}' && top != '{') return false;
            if (c == ']' && top != '[') return false;
        }
    }
    return stack.isEmpty();
}`
  },
  {
    id: 5,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]"
      }
    ],
    functionSkeleton: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    // Write your code here
    
}`,
    correctSolution: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    if (list1 == null) return list2;
    if (list2 == null) return list1;
    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
}`
  },
  {
    id: 6,
    title: "Maximum Subarray",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming"],
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      }
    ],
    functionSkeleton: `public int maxSubArray(int[] nums) {
    // Write your code here
    
}`,
    correctSolution: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    for (int i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}`
  },
  {
    id: 7,
    title: "Add Two Numbers",
    difficulty: "Medium",
    tags: ["Linked List", "Math"],
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807."
      }
    ],
    functionSkeleton: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    // Write your code here
    
}`,
    correctSolution: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    int carry = 0;
    while (l1 != null || l2 != null || carry != 0) {
        int sum = carry;
        if (l1 != null) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2 != null) {
            sum += l2.val;
            l2 = l2.next;
        }
        carry = sum / 10;
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
    }
    return dummy.next;
}`
  },
  {
    id: 8,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["String", "Sliding Window"],
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      {
        input: "s = 'abcabcbb'",
        output: "3",
        explanation: "The answer is 'abc', with the length of 3."
      }
    ],
    functionSkeleton: `public int lengthOfLongestSubstring(String s) {
    // Write your code here
    
}`,
    correctSolution: `public int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int maxLen = 0;
    int left = 0;
    for (int right = 0; right < s.length(); right++) {
        while (set.contains(s.charAt(right))) {
            set.remove(s.charAt(left));
            left++;
        }
        set.add(s.charAt(right));
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`
  },
  {
    id: 9,
    title: "Container With Most Water",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers"],
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49"
      }
    ],
    functionSkeleton: `public int maxArea(int[] height) {
    // Write your code here
    
}`,
    correctSolution: `public int maxArea(int[] height) {
    int maxArea = 0;
    int left = 0;
    int right = height.length - 1;
    while (left < right) {
        int area = Math.min(height[left], height[right]) * (right - left);
        maxArea = Math.max(maxArea, area);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
}`
  },
  {
    id: 10,
    title: "3Sum",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers"],
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]"
      }
    ],
    functionSkeleton: `public List<List<Integer>> threeSum(int[] nums) {
    // Write your code here
    
}`,
    correctSolution: `public List<List<Integer>> threeSum(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    Arrays.sort(nums);
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1;
        int right = nums.length - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}`
  },
  {
    id: 11,
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    tags: ["Backtracking", "String"],
    description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.",
    examples: [
      {
        input: "digits = '23'",
        output: "['ad','ae','af','bd','be','bf','cd','ce','cf']"
      }
    ],
    functionSkeleton: `public List<String> letterCombinations(String digits) {
    // Write your code here
    
}`,
    correctSolution: `public List<String> letterCombinations(String digits) {
    if (digits.isEmpty()) return new ArrayList<>();
    String[] map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    List<String> result = new ArrayList<>();
    backtrack(result, map, digits, 0, new StringBuilder());
    return result;
}
private void backtrack(List<String> result, String[] map, String digits, int index, StringBuilder sb) {
    if (index == digits.length()) {
        result.add(sb.toString());
        return;
    }
    String letters = map[digits.charAt(index) - '0'];
    for (char c : letters.toCharArray()) {
        sb.append(c);
        backtrack(result, map, digits, index + 1, sb);
        sb.deleteCharAt(sb.length() - 1);
    }
}`
  },
  {
    id: 12,
    title: "Generate Parentheses",
    difficulty: "Medium",
    tags: ["Backtracking", "String"],
    description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    examples: [
      {
        input: "n = 3",
        output: "['((()))','(()())','(())()','()(())','()()()']"
      }
    ],
    functionSkeleton: `public List<String> generateParenthesis(int n) {
    // Write your code here
    
}`,
    correctSolution: `public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    backtrack(result, "", 0, 0, n);
    return result;
}
private void backtrack(List<String> result, String current, int open, int close, int max) {
    if (current.length() == max * 2) {
        result.add(current);
        return;
    }
    if (open < max) {
        backtrack(result, current + "(", open + 1, close, max);
    }
    if (close < open) {
        backtrack(result, current + ")", open, close + 1, max);
    }
}`
  },
  {
    id: 13,
    title: "Merge Intervals",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]"
      }
    ],
    functionSkeleton: `public int[][] merge(int[][] intervals) {
    // Write your code here
    
}`,
    correctSolution: `public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> result = new ArrayList<>();
    int[] current = intervals[0];
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= current[1]) {
            current[1] = Math.max(current[1], intervals[i][1]);
        } else {
            result.add(current);
            current = intervals[i];
        }
    }
    result.add(current);
    return result.toArray(new int[result.size()][]);
}`
  },
  {
    id: 14,
    title: "Climbing Stairs",
    difficulty: "Easy",
    tags: ["Dynamic Programming"],
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways to climb to the top: 1+1+1, 1+2, 2+1"
      }
    ],
    functionSkeleton: `public int climbStairs(int n) {
    // Write your code here
    
}`,
    correctSolution: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int prev1 = 2;
    int prev2 = 1;
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}`
  },
  {
    id: 15,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    tags: ["Tree", "Stack"],
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]"
      }
    ],
    functionSkeleton: `public List<Integer> inorderTraversal(TreeNode root) {
    // Write your code here
    
}`,
    correctSolution: `public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    Stack<TreeNode> stack = new Stack<>();
    TreeNode current = root;
    while (current != null || !stack.isEmpty()) {
        while (current != null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.add(current.val);
        current = current.right;
    }
    return result;
}`
  },
  {
    id: 16,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    tags: ["Tree", "DFS"],
    description: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3"
      }
    ],
    functionSkeleton: `public int maxDepth(TreeNode root) {
    // Write your code here
    
}`,
    correctSolution: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`
  },
  {
    id: 17,
    title: "Coin Change",
    difficulty: "Medium",
    tags: ["Dynamic Programming"],
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1"
      }
    ],
    functionSkeleton: `public int coinChange(int[] coins, int amount) {
    // Write your code here
    
}`,
    correctSolution: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
  },
  {
    id: 18,
    title: "Word Break",
    difficulty: "Medium",
    tags: ["Dynamic Programming", "String"],
    description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    examples: [
      {
        input: "s = 'leetcode', wordDict = ['leet','code']",
        output: "true",
        explanation: "Return true because 'leetcode' can be segmented as 'leet code'."
      }
    ],
    functionSkeleton: `public boolean wordBreak(String s, List<String> wordDict) {
    // Write your code here
    
}`,
    correctSolution: `public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> dict = new HashSet<>(wordDict);
    boolean[] dp = new boolean[s.length() + 1];
    dp[0] = true;
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && dict.contains(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length()];
}`
  },
  {
    id: 19,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    tags: ["String", "Dynamic Programming"],
    description: "Given a string s, return the longest palindromic substring in s.",
    examples: [
      {
        input: "s = 'babad'",
        output: "'bab'",
        explanation: "'aba' is also a valid answer."
      }
    ],
    functionSkeleton: `public String longestPalindrome(String s) {
    // Write your code here
    
}`,
    correctSolution: `public String longestPalindrome(String s) {
    if (s == null || s.length() < 1) return "";
    int start = 0;
    int end = 0;
    for (int i = 0; i < s.length(); i++) {
        int len1 = expandAroundCenter(s, i, i);
        int len2 = expandAroundCenter(s, i, i + 1);
        int len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.substring(start, end + 1);
}
private int expandAroundCenter(String s, int left, int right) {
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        left--;
        right++;
    }
    return right - left - 1;
}`
  },
  {
    id: 20,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tags: ["Array", "Binary Search"],
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2."
      }
    ],
    functionSkeleton: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    // Write your code here
    
}`,
    correctSolution: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    int m = nums1.length;
    int n = nums2.length;
    int left = 0;
    int right = m;
    while (left <= right) {
        int partition1 = (left + right) / 2;
        int partition2 = (m + n + 1) / 2 - partition1;
        int maxLeft1 = partition1 == 0 ? Integer.MIN_VALUE : nums1[partition1 - 1];
        int minRight1 = partition1 == m ? Integer.MAX_VALUE : nums1[partition1];
        int maxLeft2 = partition2 == 0 ? Integer.MIN_VALUE : nums2[partition2 - 1];
        int minRight2 = partition2 == n ? Integer.MAX_VALUE : nums2[partition2];
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 == 0) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            right = partition1 - 1;
        } else {
            left = partition1 + 1;
        }
    }
    return 0.0;
}`
  }
];
