// scripts/deleteBoard.ts
import { client } from '../sanity/lib/client'

async function deleteBoard(boardId: string) {
  console.log(`🚀 Starting deletion process for board: ${boardId}`)
  
  // Confirm deletion
  const board = await client.fetch(`*[_type == "board" && _id == $boardId][0] { name }`, { boardId })
  if (!board) {
    console.error('❌ Board not found')
    return
  }
  
  console.log(`⚠️  WARNING: You are about to delete board: ${board.name}`)
  console.log('This will delete ALL related grades, subjects, chapters, and lessons!')
  console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...')
  
  await new Promise(resolve => setTimeout(resolve, 5000))
  
  try {
    // Step 1: Find all grades under this board
    const grades = await client.fetch(`
      *[_type == "grade" && board._ref == $boardId] { _id }
    `, { boardId })
    
    console.log(`📊 Found ${grades.length} grades to delete`)
    
    // Step 2: For each grade, find and delete subjects
    for (const grade of grades) {
      const subjects = await client.fetch(`
        *[_type == "subject" && grade._ref == $gradeId] { _id }
      `, { gradeId: grade._id })
      
      console.log(`  📚 Found ${subjects.length} subjects in grade ${grade._id}`)
      
      // Step 3: For each subject, find and delete chapters
      for (const subject of subjects) {
        const chapters = await client.fetch(`
          *[_type == "chapter" && subject._ref == $subjectId] { _id }
        `, { subjectId: subject._id })
        
        console.log(`    📑 Found ${chapters.length} chapters in subject ${subject._id}`)
        
        // Step 4: For each chapter, find and delete posts
        for (const chapter of chapters) {
          const posts = await client.fetch(`
            *[_type == "post" && chapter._ref == $chapterId] { _id }
          `, { chapterId: chapter._id })
          
          console.log(`      📝 Found ${posts.length} posts in chapter ${chapter._id}`)
          
          // Delete posts
          if (posts.length > 0) {
            await client.transaction()
              .delete(posts.map(p => p._id))
              .commit()
            console.log(`      ✅ Deleted ${posts.length} posts`)
          }
          
          // Delete chapter
          await client.delete(chapter._id)
          console.log(`    ✅ Deleted chapter ${chapter._id}`)
        }
        
        // Delete subject
        await client.delete(subject._id)
        console.log(`  ✅ Deleted subject ${subject._id}`)
      }
      
      // Delete grade
      await client.delete(grade._id)
      console.log(`✅ Deleted grade ${grade._id}`)
    }
    
    // Step 5: Finally delete the board
    await client.delete(boardId)
    console.log(`✅ Board ${boardId} deleted successfully`)
    
  } catch (error) {
    console.error('❌ Error during deletion:', error)
  }
}

// Run with: npx tsx scripts/deleteBoard.ts BOARD_ID
const boardId = process.argv[2]
if (!boardId) {
  console.error('❌ Please provide a board ID')
  console.log('Usage: npx tsx scripts/deleteBoard.ts YOUR_BOARD_ID')
  process.exit(1)
}

deleteBoard(boardId).catch(console.error)